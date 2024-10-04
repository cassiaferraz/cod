
export default async function fetchUserNotifications({token, serverIP}) {
    try {
        const response = await fetch(`${serverIP}/getUserNotifications`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        })
        // const data = await response.json()
        return response;

    } catch(error) {
        console.error(error)
        return null
    }
}
