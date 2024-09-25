    useEffect(() => {


        if (token) {
            //console.log('Fetching avatar');
            fetch(`${serverIP}/avatar/get-avatar?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar o avatar');
                    }
                    return response.json();
                })
                .then(data => setAvatar(data.avatarId))
                .catch(error => console.error('Erro ao buscar o avatar:', error));
        } else {
            console.error('user id não encontrado no sessionStorage');
        }
    }, [serverIP, token]);

    
    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSaveAvatar = async () => {
        if (selectedAvatar && userId && token) {
            try {
                //console.log('Dados enviados para o servidor:', {userId, avatarId:selectedAvatar});
                const response = await fetch(`${serverIP}/avatar/set-avatar`, {
                    
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify({ userId: userId, avatarId: selectedAvatar })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('resposta:', data);
                    setAvatar(selectedAvatar);
                    sessionStorage.setItem('avatar', selectedAvatar);
                    //console.log('avatar salvo no localstorage', selectedAvatar)
                    Swal.fire({
                        icon: 'success',
                        title: 'Alterado!',
                        text: 'Avatar atualizado com sucesso!',
                    });
                } else {
                    const errorData = await response.json();
                    console.log('erro na resposta:',errorData);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: `Erro ao atualizar o avatar: ${response.statusText}`,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: `Erro ao atualizar o avatar: ${error.message}`,
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'User ID ou token não encontrado. Por favor, faça login novamente.',
            });
        }
    };
