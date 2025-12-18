//creo la funzione che riceve id ricetta usando async che poi metterò nella funzione await
//try mi serve per dire di eseguire tutto questo-se qualcosa va male invece finisce in catch
//recipeRes è il contenitore ( non è la ricetta e non è un oggetto, all'interno c'è del testo scritto in formato json preso da internet,
//ma JavaScript non può usare direttamente quel testo quindi  const recipe = await recipeRes.json() prende il contenuto della risposta
//lo legge (serve tempo → await) lo trasforma da testo JSON


async function getChefBirthDay(id) {
    try {
        const recipeRes = await fetch("https://dummyjson.com/recipes/" + id);

        if (recipeRes.ok === false) {
            throw new Error("recipe not found");  //SE la risposta NON è ok allora lancia un errore (se va male  fermalo subito con un errore)
        }

        const recipe = await recipeRes.json();   // trasformo la risposta in un oggetto json
        const userId = recipe.userId;  //prendo la proprietà user dalla ricetta

        if (userId === undefined) {
            throw new Error("userId not found");
        }

        const userRes = await fetch("https://dummyjson.com/users/" + userId); // uso userId per andarmi a prendere utente e uso await x aspettare risposta

        if (userRes.ok === false) {
            throw new Error("user not found");
        }

        const user = await userRes.json();
        return user.birthDate;

    } catch (error) {
        throw error;
    }
}

getChefBirthday(1)
    .then(birthday => console.log("Data di nascita dello chef:", birthday))
    .catch(error => console.error("Errore:", error.message));