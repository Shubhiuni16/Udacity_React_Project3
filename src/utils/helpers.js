import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
//import * as Permissions from 'expo-permissions'

const key="flashcards:decks"
const notificationKey='flashcards:notifications'

export const data= {
    React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
    }
};

export function setInitialData(){
  AsyncStorage.setItem(key,JSON.stringify({data}))
  return {data};
}

export const getDecks = async () => {
    const result = await AsyncStorage.getItem(key);
    //AsyncStorage.clear();
    return result!==null ? JSON.parse(result) : JSON.parse(setInitialData());
}
export const getDeck = async(name) => {
    const result= await AsyncStorage.getItem(key);
    return JSON.parse(result).data[name];
}

export const addDeck=(name)=> {
    return AsyncStorage.mergeItem(
      key,
      JSON.stringify({
        data:{
          [name]: {
            title:name,
            questions: []
          }
        }
      })
    );
}
  
export const addCard = async (name, card) => {
  const deck = await getDeck(name);
  return AsyncStorage.mergeItem(
    key,
    JSON.stringify({data:{ [name]: { name, questions: [...deck.questions].concat(card) } }})
  );
};

export async function clearLocalNotification(){
  console.log("notification cleared")
  const result = await AsyncStorage.removeItem(notificationKey);
  return Notifications.cancelAllScheduledNotificationsAsync(result);
}

/* export function setLocalNotification() {
  AsyncStorage.getItem(notificationKey)
  .then(JSON.parse)
  .then((data) => {
      if (data === null) {
          Notifications.getPermissionsAsync()
          .then(({status}) => {
              if (status === 'granted') {
                  Notifications.cancelAllScheduledNotificationsAsync()
                  const tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(20)
                  tomorrow.setMinutes(0)

                  Notifications.scheduleNotificationAsync(
                    {
                      title: 'TAKE QUIZ!!!',
                      body: "HEY!!👋 QUIZ TIME. LET'S STUDY",
                      ios: {
                        sound: true
                      },
                      android: {
                          sound: true,
                          vibrate: true,
                          priority: 'high',
                          sticky: false,
                      }
                    },
                    {
                        time: tomorrow,
                        repeat: 'day',
                    }
                  )

                  AsyncStorage.setItem(notificationKey, JSON.stringify(true))
              }
          })
      }
  })
} */
export function setLocalNotification() {
  console.log("notification set")
  AsyncStorage.getItem(notificationKey)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        //Permissions.getAsync(Permissions.NOTIFICATIONS)
        Notifications.getPermissionsAsync()
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
                .then(()=> {
                  Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                      shouldShowAlert: true,
                      shouldPlaySound: true,
                      shouldSetBadge: false,
                    }),
                  })
                  let tomorrow = new Date()
                  tomorrow.setHours(20)
                  tomorrow.setMinutes(0)
                  tomorrow.setSeconds(0)
                  tomorrow.setMilliseconds(0)
                  tomorrow = tomorrow.getTime() + (1000 * 60 * 60 * 24)
                  let notificationDate = new Date(tomorrow)
                  Notifications.scheduleNotificationAsync(
                    {
                      content: {
                      title: 'TAKE QUIZ!!!',
                      body: "HEY!!👋 QUIZ TIME. LET'S STUDY",
                    },
                      trigger: notificationDate,
                    }
                  )
                    .then(AsyncStorage.setItem(notificationKey, JSON.stringify(true)))
                })
              }    
          })
      }
    })
} 