pipeline{
    agent any

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
           }
        }

    }

}