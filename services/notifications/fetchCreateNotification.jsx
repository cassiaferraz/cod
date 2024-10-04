export default async function fetchCreateNotification({token, form, serverIP}) {
    try {
        // console.log(form)
        const response = await fetch(`${serverIP}/createNotification` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token },
            body: JSON.stringify({ 
                notificationCategory: form.category,
                receiverId: form.receiverId,
                senderId: form.senderId,
                complementaryData: form.complementaryData
            })
        })
        // console.log(response)
        return response;

    } catch(error) {
        console.error(error)
        return null
    }
}
