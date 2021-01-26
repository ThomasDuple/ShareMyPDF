class Salon{
    constructor(pdf, code, presentateurIp, presentateurPseudo){
        this.membres = {};
        this.ips = [];
        this.presentateurIp = presentateurIp;
        this.presentateurPseudo = presentateurPseudo;
        this.presentateurId = "";
        this.code = code;
        this.pdf = pdf;
        this.pageProf = 1;
        this.annotations = [];
        this.questions = [];
        this.questionsEleve = [];
        this.bannis= [];
    }

    addMembre(pseudo, id, ip){
        if(pseudo == this.presentateurPseudo){
            this.presentateurId = id;
        }
        else{
            this.membres[pseudo] = id;
            this.ips[pseudo] = ip;
        }
    }

    setPage(page){
        this.pageProf = page;
        io.to(this.code).emit('page', parseInt(page));
    }

    rmMembre(id){
        console.log("Disconnecting")
        if(id == this.presentateurId){
            this.presentateurId = ""
        }
        else{
            delete this.membres[this.getKeyByValue(id)];
            console.log(this.membres);
        }
    }

    addBanni(pseudo){
        this.bannis.push(this.ips[pseudo]);
    }

    estBanni(ip){
        console.log(this.bannis);
        return this.bannis.includes(ip);
    }
    estVide(){        
        if(Object.keys(this.membres).length == 0 && this.presentateurId == ""){
            return true;
        }
        else{
            return false;
        }
    }
    getKeyByValue(value) {
        return Object.keys(this.membres).find(key => this.membres[key] === value);
    }

    addQuestion(q){
        this.questions.push(q);
        console.log("Question ajoutée : "+q.nom);
        console.log("=============================");
        console.log("Liste des questions à jour :")
        this.questions.forEach(quest => {
            console.log(quest.nom);
        });
        console.log("=============================");
      }
    
    addQuestionEleve(value){
        this.questionsEleve.push({leSujet: value.leSujet, leContenu: value.leContenu, pseudo : value.pseudo})
    }
}

module.exports = Salon;