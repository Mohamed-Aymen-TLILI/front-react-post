const CommentairesPages = ({commentaires, isLoadedCom}) => {

      if (!commentaires) {
              return (   <h1>Pas de commentaires</h1>)
            } 
            else if (!isLoadedCom) {
               return <div>Chargement de commentaires...</div>
            }
            else  {
          return(<>  {!!commentaires.length && commentaires.map((m, i) =>  
            <div>
                 <p className="lead" key={m.id}>
                {m.content}
                </p>
                   <hr className="my-4" />
            </div>
    
                            )
          }</> );
        }
}
export default CommentairesPages;