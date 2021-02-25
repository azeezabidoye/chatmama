export class Chat {
    constructor({ position = 'bottom-right' } = { }) {
        this.position = this.getPosition(position)
        this.active = false
        this.initialize()
        this.createStyles()
    }
    getPosition(position) {
        const [vertical, horizontal] = position.split('-')
        return {
            [vertical]: '30px',
            [horizontal]: '30px'
        }
    };

    initialize() {
        const container = document.createElement('div')
        container.style.position = 'fixed'
        Object.keys(this.position).forEach(key => {
            container.style[key] = this.position[key]
        })
        document.body.appendChild(container)

        const btnCon = document.createElement('div')
        btnCon.classList.add('btn-con')

        const chatIcon = document.createElement('img')
        chatIcon.src = '/assets/assets/chat.svg'
        chatIcon.classList.add('icon')
        this.chatIcon = chatIcon

        const closeIcon = document.createElement('img')
        closeIcon.src= '/assets/assets/cross.svg'
        closeIcon.classList.add('icon', 'hidden')
        this.closeIcon = closeIcon

        this.msgCon = document.createElement('div')
        this.msgCon.classList.add('hidden', 'msg-con')

        this.createMsgConTent()

        btnCon.appendChild(chatIcon)
        btnCon.appendChild(closeIcon)
        btnCon.addEventListener('click', this.toggleActive.bind(this))

        container.appendChild(this.msgCon)
        container.appendChild(btnCon)
    }

    createMsgConTent() {
        this.msgCon.innerHTML = ''
        const title = document.createElement('h2')
        title.textContent = 'Subscribe to our monthly newsletter!'

        const form = document.createElement('form')
        form.classList.add('content')


        const email = document.createElement('input')
        email.required = true
        email.id = 'email'
        email.type = 'email'
        email.placeholder = 'Your email here'

        const message = document.createElement('textarea')
        message.required = true
        message.id = 'message'
        message.placeholder = 'Write your message here...'

        const submitBtn = document.createElement('button')
        submitBtn.textContent = 'Submit'

        form.appendChild(email)
        form.appendChild(message)
        form.appendChild(submitBtn)
        form.addEventListener('submit', this.submit.bind(this))

        this.msgCon.appendChild(title)
        this.msgCon.appendChild(form)
    }

    createStyles() {
        const styleTag = document.createElement('style')
        document.head.appendChild(styleTag)

        styleTag.innerHTML = `
            .icon {
                position: absolute;
                cursor: pointer;
                width: 70%;
                top: 9px;
                left: 9px;
                transition: transform 0.3s ease;
            }

            .hidden {
                transform: scale(0);
            }

            .btn-con {
                background-color: #04b73f;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                color: #fff;
            }

            .msg-con {
                box-shadow: 0 5px 20px #ccc;
                width: 400px;
                right: -25px;
                bottom: 75px;
                max-height: 400px;
                position: absolute;
                transition: max-height 0.3s ease-in-out;
                font-family: sans-serif;
            }

            .msg-con.hidden {
                max-height: 0px;
            }

            .msg-con .content {
                display: flex;
                flex-direction: column;
                background-color: #fff;
                border: 1px solid #ccc;
                padding: 10px;
                margin: 20px 10px;
            }

            .msg-con h2 {
                color: #efefef;
                background-color: #04b73f;
                margin: 0px;
                padding: 20px;
                text-align: center;
            }

            .msg-con form * {
                margin: 5px 0px;
            }

            .msg-con form input {
                padding: 10px;
                border-radius: 5px;
            }

            .msg-con form textarea {
                height: 100px;
                padding: 10px;
                border-radius: 5px;
            }

            .msg-con form textarea::placeholder,
            .msg-con form input::placeholder {
                color: #ccc;
                font-family: sans-serif;
            }

            .msg-con form button {
                cursor: pointer;
                background-color: #04b73f;
                padding: 10px;
                color: #efefef;
                border: 1px solid #04b73f;
                border-radius: 5px;
                transition: all 0.3s ease;
            }

            .msg-con form button:hover {
                background-color: #0e9e3e;
                color: #efefef;
                border: 1px solid #0e9e3e;
            }
        `;
    }

    
    submit(event) {
        event.preventDefault()

        const formData = {
            email: event.srcElement.querySelector('#email').value,
            message: event.srcElement.querySelector('#message').value
        }
        this.msgCon.innerHTML = '<h2>Thank you for subscribing. We\'ll keep you posted!</h2>'
        console.log(formData)
    }

    toggleActive() {
        this.active = !this.active

        if (this.active) {
            this.chatIcon.classList.add('hidden')
            this.closeIcon.classList.remove('hidden')
            this.msgCon.classList.remove('hidden')
        } else {
            this.createMsgConTent()
            this.chatIcon.classList.remove('hidden')
            this.closeIcon.classList.add('hidden')
            this.msgCon.classList.add('hidden')
        }
    }
}