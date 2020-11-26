const webPush = require("web-push");

const vapidKeys = {
    publicKey : "BBLcK3F2gkJdNNd0ijPBPCvG5gJDPvAzRFda5CMiYfjyQHgK0sqcBYdbPRHiuGakZX4WptYCNObfyPjQ9iFE9GU",
    privateKey : "NQBPjpUanPTSnDdV5BaRQpMkyn82Dt00xvdOjXI9Raw"
}
const subscription = {
    endpoint : "https://fcm.googleapis.com/fcm/send/fet_KqiuuD0:APA91bFZh8Wc5zsxDOKpj-DvH5qdZrYyZ3wFDrGidG5yUeukgpF66rzN7Zd5RyBePBRy-UiRJMxYebxfCikiYorp4BS2iFFgxUMQNPH5340hirn5_QRdyX3JKfZhvPoNJrZ1gDSOlphi",
    keys : {
        p256dh : "BGY2i+k+Vj3vI4Vdp/Ax99bq8vd4pj/vhMF0FWu/VBT92M5bG3jAtoTOnpzUjxqhcL4GR8jFurVhQAszNVdDUiM=",
        auth : "RflBftU7UqLadtzij1jlWg=="
    }
}
const options = {
    gcmAPIKey : "695546885726",
    TTL : 60
}
webPush.setVapidDetails(
    'mailto:meldiyansa@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
    )

let payloads = "Selamat datang, Salam Kenal"

webPush.sendNotification(
    subscription,
    payloads,
    options
)