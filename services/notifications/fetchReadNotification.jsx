
export default async function fetchReadNotification({token, notificationId, serverIP}) {
    try {
        const response = await fetch(`${serverIP}/readNotification${notificationId}` , {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        })
        // console.log(response)
        return response;

    } catch(error) {
        console.error(error)
        return null
    }
}
