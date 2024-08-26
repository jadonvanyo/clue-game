# Online-Games
Full stack web application allowing users to play online multiplayer games in real time.

**TODO**
*Insert GIF of usage here* 

The project is currently hosted on AWS EC2. You can check it out [here](http://3.143.218.12:3000/login/).

## Table of Contents
- [Background](#background)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

## Background
Long story short: I wanted to play games with my friends, but they were too far away.

### Problem
I have some friends that live a few hours from myself and each other. Every so often, we will get together to hangout, share drinks, and play various tabletop games. I wanted to create a project that would allow us to get together to play tabletop games on a more regular basis, no matter how far apart we were. At the same time, I wanted to learn about React, Django, and AWS, so I decided to build all of that into one comprehensive project: Online Games!

### Solution
**TODO**

## Tech Stack

**Client:** React, HTML, CSS

**Server:** Django

**Containerization:** Docker

**Databases:** PostgreSQL, Redux


## Environment Variables
**TODO**
To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## Installation
These instructions will walk you through installing this project to run developer mode locally on your machine:

1. Clone the repository:
```bash
 git clone https://github.com/jadonvanyo/clue-game.git
```

2. Install client dependencies and build:
```bash
 cd frontend
 npm install
 npm run build
```
Navigate back to the source folder.

3. Setup virtual python environment:
```bash
 cd backend
 python3 -m venv env  
 source env/bin/activate
```

4. Install the dependencies in the virtual environment:
```bash
 pip install -r requirements.txt
```

5. Install redis:
```bash
 brew install redis
```

## Usage
These instructions will walk you through running this project on your local machine:

1. Run the client side:
```bash
 cd frontend
 npm run dev
```

2. Run the server side in a new terminal: 
```bash
 python3 manage.py runserver
```

3. Start redis:
```bash
 redis-server
```

## Features

- Light/dark mode toggle
- Real time game updates
- Secure login
- **TODO**

## Contributing

Contributions are always welcome!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

**TODO: make dev branch and modify app for dev branch**