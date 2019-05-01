def cf_dist = [
    v1: [
        seriea: [
            dev: 'E1BYFYZ6ZS2WT5',
            prod: 'E3FYNLKXUJR3RC'
        ],
    ]
]

pipeline {
    agent any
    environment {
        workspace = pwd()
    }
    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Build') {
            agent {
                label 'static_build'
            }
            steps {
                cleanWs()
                echo 'Building..'
                checkout scm
                script {
                    currentBuild.displayName = "${BUILD_NUMBER} - ${GIT_BRANCH} - ENV: ${SERVER_ENV}"
                }
                sh "source /opt/rh/rh-nodejs8/enable && npm install"
                sh "source /opt/rh/rh-nodejs8/enable && npm run build"
            }
        }
        stage('Deploy') {
            agent {
                label "static_build"
            }
            steps {
                echo 'Deploying....'
                withAWS(credentials: "${env.SCOPE}_${env.SERVICE}_${env.SERVER_ENV}") {

                    s3Upload(file:'build/', bucket:"${env.ARTIST_BUCKET}-influencer-${env.SERVER_ENV}", path:'pub/')
                    sh """\
                        aws cloudfront create-invalidation \
                            --distribution-id \"${cf_dist[env.SCOPE][env.ARTIST][env.SERVER_ENV]}\" \
                            --paths '/*' | jq -r '.Invalidation.Id' > cf_inv_id \
                        """
                    sh "aws cloudfront wait invalidation-completed --distribution-id \"${cf_dist[env.SCOPE][env.ARTIST][env.SERVER_ENV]}\" --id `cat cf_inv_id`"
                }
            }
        }
    }
    post {
        always {
            slackNotify('#jenkins_ci',currentBuild.currentResult)
        }
    }
}

@NonCPS
def slackNotify(channel,result)
{
    def color = 'danger'
    if (result == 'SUCCESS') {
        color = 'good'
    }

    def changeLogSets = currentBuild.changeSets
    def changeLogMsg = "Changes:\n"

    for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length; j++) {
            def entry = entries[j]
            changeLogMsg += "- ${entry.msg} [${entry.author}]\n"
        }
    }

    def message = "${env.JOB_NAME} - ${currentBuild.displayName} ${currentBuild.currentResult} after ${currentBuild.durationString} ${changeLogMsg}"
    slackSend channel: channel, color: color, message: message
    
    if (result == 'FAILURE') {
        slackSend channel: '#frontend', color: color, message: message
    }
}
