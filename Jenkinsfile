pipeline{
    agent any
    environment{
        NPM_CONFIG_CACHE= "${WORKPACE}/.npm"
    }

    stages{
        stage("proceso de build y test"){
            agent{
                docker{
                    image 'node:22'
                }
            }
            stages{
                stage("instalacion de dependencias"){
                    steps{
                        sh 'npm install'
                    }
                }
                stage("ejecucion de pruebas"){
                    steps{
                        sh 'npm run test:cov'
                    }
                }
           }
        }

    }

}