             <a 
             style={{ textDecoration: 'none', pointerEvents: avaliacaoDisponivel ? 'auto' : 'none', color: avaliacaoDisponivel ? 'white' : 'white' }} 
             href={avaliacaoDisponivel ? "/AutoAvaliacao" : "#"}
            >
             {avaliacaoDisponivel ? 'Realize auto avaliação aqui.' : 'Limite de autoavaliações atingido para hoje.'}
             
             </a>


                <a href="/perfil">
                    <img
                        className="btn-backPage"
                        src={BackArrow}
                        alt="Voltar"
                    />
                </a>


                import { useNavigate } from 'react-router-dom'
