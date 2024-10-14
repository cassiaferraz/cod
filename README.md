<button
    style={{
        textDecoration: 'none',
        pointerEvents: avaliacaoDisponivel ? 'auto' : 'none',
        color: avaliacaoDisponivel ? 'white' : 'white',
    }}
    onClick={() => {
        if (avaliacaoDisponivel) {
            navigate("/AutoAvaliacao");
        }
    }}
    disabled={!avaliacaoDisponivel}
>
    {avaliacaoDisponivel ? 'Realize auto avaliação aqui.' : 'Limite de autoavaliações atingido para hoje.'}
</button>
