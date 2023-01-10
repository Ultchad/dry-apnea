const selectElement = document.getElementById("cycle-select");
const selectLanguage = document.getElementById("language-selector");
const selectDuration = document.getElementById("duration-select");
const textDuration = document.getElementById("duration-text");
const startButton = document.getElementById("start-button");
const cycleTitle = document.getElementById("cycle-title");
const timer = document.getElementById("timer");
const stageTimer = document.getElementById("stage-timer");
const nextStageTimer = document.getElementById("next-stage");
const roundElement = document.getElementById("round");
const totalTimerElement = document.getElementById("total-timer");
let interval = null
let lock = false;
let lang = "fr"
const languageTitle = document.getElementById("title");
const languageCycle = document.getElementById("label-cycle-select");
const languageDuration = document.getElementById("label-duration-select");


startButton.addEventListener("click", () => {
    // Récupérez les valeurs de chaque étape du cycle respiratoire
    // à partir de la valeur sélectionnée dans le menu déroulant
    
    const cycleJson = exercises[selectElement.value].tasks; 
    
    let totalTimeStart = 0;
    for (let i=0; i < cycleJson.length; i++){
        totalTimeStart += parseInt(cycleJson[i].value)
    };
    
    const sessionTotalTimeStart = parseInt(selectDuration.value) * totalTimeStart;
    let cycleId = 0;
    let time = -1;
    let totalTime = totalTimeStart;
    let sessionTotalTime = sessionTotalTimeStart;
    let nextStageTimerContent = ""


    // Mettez à jour le titre du cycle respiratoire
    // cycleTitle.textContent = `Cycle respiratoire : ${exercises[selectElement.value].info.name}`;

    const endTimer = () => {
        console.log(`end`)
        startButton.innerText = "Démarrer";
        timer.textContent = "";
        stageTimer.textContent = "";
        nextStageTimer.textContent = "";
        roundElement.textContent = "";
        totalTimerElement.textContent = "";
        clearInterval(interval);
        lock = false;
    }

    // Créez une fonction qui met à jour le timer toutes les secondes
    const updateTimer = () => {
        if (sessionTotalTime == 0){
            endTimer()
        } else {
            if ( time <= 0 ){

                if ( time == -1){
                    cycleId = 0
                } else {
                    cycleId++;
                }                
                
                if (cycleId >= cycleJson.length){
                    cycleId = 0
                }
                console.log(`cycleId: ${cycleId}`)
                console.log(`cycleName: ${cycleJson[cycleId].name}`)
                stageTimer.textContent = `${languages[lang].tasks[cycleJson[cycleId].name]}`;
                time = parseInt(cycleJson[cycleId].value);

                if (cycleId + 1 >= cycleJson.length){
                    nextStageTimerContent = languages[lang].tasks[cycleJson[0].name];
                } else {
                    nextStageTimerContent = languages[lang].tasks[cycleJson[cycleId + 1].name];
                }
                nextStageTimer.textContent = `> ${nextStageTimerContent}`;
                
            }

            if ( totalTime == 0 ){
                totalTime = totalTimeStart;
                console.log(`totalTime: ${totalTime}`)
            }

            // timer.textContent = `Temps restant : ${time} sec Cycle / ${totalTime} sec (Cumul Cycle) / ${sessionTotalTime} sec Session ( Total ${sessionTotalTimeStart} s)`;
            timer.textContent = `${String(time).padStart(2, '0')} s`
            roundElement.textContent = `${totalTime} s`;
            totalTimerElement.textContent = `${sessionTotalTime} s`;
            time--;
            totalTime--;
            sessionTotalTime--;    
        }    
    };

    if (lock){
        endTimer()
    }else{
        lock = true
        startButton.innerText = "Stop";
        interval = setInterval(updateTimer, 1000);
    }
    
});

const showLanguage = () => {
    lang = selectLanguage.value;
        
    languageTitle.innerText = languages[lang].title;
    languageCycle.innerText = languages[lang].cycleSelect;
    languageDuration.innerText = languages[lang].durationSelect;
    startButton.innerText = languages[lang].startButton;
}

selectLanguage.addEventListener("change", () => {
    showLanguage();
})

const showDuration = () =>{
    const cycleJson = exercises[parseInt(selectElement.value)].tasks

    let totalTimeStart = 0;
    for (let i=0; i < cycleJson.length; i++){
        totalTimeStart += parseInt(cycleJson[i].value)
    };    

    let selectDurationValue =  parseInt(selectDuration.value)
    let sessionTotalTimeStart = selectDurationValue * totalTimeStart
    textDuration.innerText = `Total: ${sessionTotalTimeStart} sec (${sessionTotalTimeStart / 60} min)`
}

selectElement.addEventListener("change", () => {
    showDuration();
})

selectDuration.addEventListener("change", () => {
    showDuration();
})

const languages = {
    "fr" : {
        "lang": "Français",
        "title": "Exercice d'apnée à sec",
        "cycleSelect": "Exercice respiratoire :",
        "durationSelect": "Durée :",
        "startButton": "Démarrer l'exercice",
        "tasks": {
            "full_inhalation": "Inspiration complète",
            "full_apnea": "Apnée pleine",
            "normal_exhalation": "Expiration",
            "empty_apnea": "Apnée vide"
        }
    },
    "es" : {
        "lang": "Espagnol",
        "title": "Ejercicio de apnea en seco",
        "cycleSelect": "Ejercicio respiratorio:",
        "durationSelect": "Duración:",
        "startButton": "Iniciar el ejercicio",
        "tasks": {
            "full_inhalation": "Inspiración completa",
            "full_apnea": "Apnnea completa",
            "normal_exhalation": "Exhalación normal",
            "empty_apnea": "Apnnea vacía"
        }
    },
    "en" : {
        "lang": "English",
        "title": "Dry apnea exercise",
        "cycleSelect": "Respiratory exercise:",
        "durationSelect": "Duration:",
        "startButton": "Start the exercise",
        "tasks": {
            "full_inhalation": "Full inhalation",
            "full_apnea": "Full apnea",
            "normal_exhalation": "Normal exhalation",
            "empty_apnea": "Empty apnea"
        }
    },
    "de" : {
        "lang": "Deutsch",
        "title": "Trockenapnoe-Übung",
        "cycleSelect": "Atemübung:",
        "durationSelect": "Dauer:",
        "startButton": "Übung starten",
        "tasks": {
            "full_inhalation": "Vollständige Einatmung",
            "full_apnea": "Vollständige Apnoe",
            "normal_exhalation": "Normale Ausatmung",
            "empty_apnea": "Leere Apnoe"
        }
    }
}


const exercises = {
    0: {
        "info": {
            "name": "5\"/15\"/5\"/5\"",
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 15
            },
            {
                "name": "normal_exhalation",
                "value": 5
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    1: {
        "info": {
            "name": "5\"/20\"/5\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 20
            },
            {
                "name": "normal_exhalation",
                "value": 5
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    2: {
        "info": {
            "name": "5\"/25\"/5\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 25
            },
            {
                "name": "normal_exhalation",
                "value": 5
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    3: {
        "info": {
            "name": "5\"/30\"/5\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 30
            },
            {
                "name": "normal_exhalation",
                "value": 5
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    4:{
        "info": {
            "name": "5\"/35\"/5\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 35
            },
            {
                "name": "normal_exhalation",
                "value": 5
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    5:{
        "info": {
            "name": "5\"/40\"/5\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 40
            },
            {
                "name": "normal_exhalation",
                "value": 5
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    6:{
        "info": {
            "name": "5\"/45\"/5\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 45
            },
            {
                "name": "normal_exhalation",
                "value": 5
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    7:{
        "info": {
            "name": "5\"/45\"/10\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 45
            },
            {
                "name": "normal_exhalation",
                "value": 10
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    8:{
        "info": {
            "name": "5\"/50\"/10\"/5\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 50
            },
            {
                "name": "normal_exhalation",
                "value": 10
            },
            {
                "name": "empty_apnea",
                "value": 5
            }
        ]
    },
    9:{
        "info": {
            "name": "5\"/50\"/10\"/10\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 50
            },
            {
                "name": "normal_exhalation",
                "value": 10
            },
            {
                "name": "empty_apnea",
                "value": 10
            }
        ]
    },
    10:{
        "info": {
            "name": "5\"/55\"/10\"/10\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 55
            },
            {
                "name": "normal_exhalation",
                "value": 10
            },
            {
                "name": "empty_apnea",
                "value": 10
            }
        ]
    },
    11:{
        "info": {
            "name": "5\"/55\"/10\"/15\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 55
            },
            {
                "name": "normal_exhalation",
                "value": 10
            },
            {
                "name": "empty_apnea",
                "value": 15
            }
        ]
    },
    12:{
        "info": {
            "name": "5\"/60\"/10\"/15\""
        },
        "tasks": [
            {
                "name": "full_inhalation",
                "value": 5
            },
            {
                "name": "full_apnea",
                "value": 60
            },
            {
                "name": "normal_exhalation",
                "value": 10
            },
            {
                "name": "empty_apnea",
                "value": 15
            }
        ]
    }
}

// var userLang = navigator.language || navigator.userLanguage;
// console.log(userLang)

for (l in languages){
    let node = document.createElement("option");
    node.innerText = `${languages[l].lang}`
    node.value = l
    selectLanguage.appendChild(node)
};

for (i in exercises){
    let node = document.createElement("option");
    node.innerText = `${exercises[i].info.name}`
    node.value = i
    selectElement.appendChild(node)
};

showLanguage();
showDuration();
