/*
A rough dialog path for cpf-hackathon-ui
Note that this doesn't represent all of cpf's information but
a rough example of how it's supposed to work out

NOTE: Don't have to implement all
*/ 

RoughdialogPath = {
    "(main) Select a service to begin with": {
        "Calculator": "Thumbnail card - link to calculator",
        "Information": {
            "Retirement": {
                "CPF Life" : "Thumbnail card - written short into and link to full info"
                , 
                "Retirement Sum Scheme" : "Thumbnail card - written short into and link to full info"
                ,
                "Silver Support Scheme": 
                    "Thumbnail card - written short into and link to full info"
                    // "Video Card - if there is video"
                ,
            }, 
            "Housing": {
              "Public Housing Scheme" : "Thumbnail card - written short into and link to full info"
              ,
              "Private Properties Scheme": "Thumbnail card - written short into and link to full info"
            },
            "Healthcare": {
                "Medisave":  "Thumbnail card - written short into and link to full info",
                "Medishield":  "Thumbnail card - written short into and link to full info",
                "Eldershield":  "Thumbnail card - written short into and link to full info",
            } 
        },
        "Service": {
            "Housing": {
                "Application for CPF LIFE Plan": "Hero Card - With link to the form",
                "Apply to Start CPF LIFE Payout": "Hero Card - With link to the form"
            },
            "Housing": {
                "Housing Scheme": {
                    "Application to Commence Monthly CPF Deduction for Housing Loan of HDB Flat Financed with Bank Loan": 
                        "Hero Card - Link to form",
                    "Pay Housing Loan and/or Commence/Revise/Cease Monthly Instalment": "Hero Card - Link to form",
                },
                "Housing Protection Scheme": {
                    "Application for Exemption from Home Protection Scheme (HPS)": 
                        "Hero Card - Link to form",
                }
            },
            "Healthcare" : {
                "Top Up to MediSave Account": createThumbnailCard(
                    "Healthcare", 
                    "Top Up to MediSave Account", 
                    "This form allows you to top up to your own or your dependants’ MediSave Account for payment of MediShield Life premium. The e-Service may take you 5 minutes to complete.",
                    "Top up",
                    SOME_FORM_URL,
                ),
                "Change of Payer for MediShield Life Cover": "Hero Card - Link to Form"
            },
        }
    }
}

    // ======================================
    // Helper functions used to create cards.
    // COPIED FROM MICROSOFT EXAMPLES
    // Maybe can adapt these to render unique cards each time
    // ======================================

    createAdaptiveCard() {
        return CardFactory.adaptiveCard(AdaptiveCard);
    }

    createAnimationCard() {
        return CardFactory.animationCard(
            'Microsoft Bot Framework',
            [
                { url: 'https://i.giphy.com/Ki55RUbOV5njy.gif' }
            ],
            [],
            {
                subtitle: 'Animation Card'
            }
        );
    }

    createAudioCard() {
        return CardFactory.audioCard(
            'I am your father',
            ['https://www.mediacollege.com/downloads/sound-effects/star-wars/darthvader/darthvader_yourfather.wav'],
            CardFactory.actions([
                {
                    type: 'openUrl',
                    title: 'Read more',
                    value: 'https://en.wikipedia.org/wiki/The_Empire_Strikes_Back'
                }
            ]),
            {
                subtitle: 'Star Wars: Episode V - The Empire Strikes Back',
                text: 'The Empire Strikes Back (also known as Star Wars: Episode V – The Empire Strikes Back) is a 1980 American epic space opera film directed by Irvin Kershner. Leigh Brackett and Lawrence Kasdan wrote the screenplay, with George Lucas writing the film\'s story and serving as executive producer. The second installment in the original Star Wars trilogy, it was produced by Gary Kurtz for Lucasfilm Ltd. and stars Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams, Anthony Daniels, David Prowse, Kenny Baker, Peter Mayhew and Frank Oz.',
                image: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'
            }
        );
    }

    createHeroCard(titleStr, imgPath, subText) {
        return CardFactory.heroCard(
            titleStr,
            text = subText,
            CardFactory.images([imgPath]),
            // CardFactory.images(['https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg']),
            CardFactory.actions([
                {
                    type: 'openUrl',
                    title: 'Get started',
                    value: 'https://docs.microsoft.com/en-us/azure/bot-service/'
                }
            ])
        );
    }

    createReceiptCard() {
        return CardFactory.receiptCard({
            title: 'John Doe',
            facts: [
                {
                    key: 'Order Number',
                    value: '1234'
                },
                {
                    key: 'Payment Method',
                    value: 'VISA 5555-****'
                }
            ],
            items: [
                {
                    title: 'Data Transfer',
                    price: '$38.45',
                    quantity: 368,
                    image: { url: 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png' }
                },
                {
                    title: 'App Service',
                    price: '$45.00',
                    quantity: 720,
                    image: { url: 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png' }
                }
            ],
            tax: '$7.50',
            total: '$90.95',
            buttons: CardFactory.actions([
                {
                    type: 'openUrl',
                    title: 'More information',
                    value: 'https://azure.microsoft.com/en-us/pricing/details/bot-service/'
                }
            ])
        });
    }

    createSignInCard() {
        return CardFactory.signinCard(
            'BotFramework Sign in Card',
            'https://login.microsoftonline.com',
            'Sign in'
        );
    }

    createThumbnailCard(titleStr, subStr, textStr, buttonName, buttonURL) {
        return CardFactory.thumbnailCard(
            titleStr,
            // 'BotFramework Thumbnail Card',
            [{ url: 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg' }],
            // button
            [{
                type: 'openUrl',
                title: buttonName, // 'Get started',
                value: buttonURL // 'https://docs.microsoft.com/en-us/azure/bot-service/'
            }],
            {
                // subtitle: 'Your bots — wherever your users are talking.',
                // text: 'Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.'
                subtitle: subStr,
                text: textStr
            }
        );
    }

    createVideoCard() {
        return CardFactory.videoCard(
            '2018 Imagine Cup World Championship Intro',
            [{ url: 'https://sec.ch9.ms/ch9/783d/d57287a5-185f-4df9-aa08-fcab699a783d/IC18WorldChampionshipIntro2.mp4' }],
            [{
                type: 'openUrl',
                title: 'Lean More',
                value: 'https://channel9.msdn.com/Events/Imagine-Cup/World-Finals-2018/2018-Imagine-Cup-World-Championship-Intro'
            }],
            {
                subtitle: 'by Microsoft',
                text: 'Microsoft\'s Imagine Cup has empowered student developers around the world to create and innovate on the world stage for the past 16 years. These innovations will shape how we live, work and play.'
            }
        );
    }
}

module.exports.MainDialog = MainDialog;
