pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'   // 👈 must match your NodeJS config in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'   // clean install (faster + reliable)
            }
        }

        stage('Install Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                // Run playwright tests with reporter
                sh 'npx playwright test --reporter=line'
            }
        }

        stage('Publish Report') {
            steps {
                // Generate HTML report and archive it
                sh 'npx playwright show-report --reporter=html'
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/test-results/**', allowEmptyArchive: true
        }
        failure {
            echo '❌ Tests failed!'
        }
        success {
            echo '✅ Tests passed!'
        }
    }
}
