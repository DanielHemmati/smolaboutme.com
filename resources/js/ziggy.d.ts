/* This file is generated by Ziggy. */
declare module 'ziggy-js' {
  interface RouteList {
    "resend.webhook": [],
    "home": [],
    "dashboard": [],
    "user.editor": [
        {
            "name": "username",
            "required": true
        }
    ],
    "content.store": [],
    "user.profile": [
        {
            "name": "username",
            "required": true
        }
    ],
    "test": [],
    "profile.edit": [],
    "profile.update": [],
    "profile.destroy": [],
    "password.edit": [],
    "password.update": [],
    "appearance": [],
    "auth.github": [],
    "register": [],
    "login": [],
    "password.request": [],
    "password.email": [],
    "password.reset": [
        {
            "name": "token",
            "required": true
        }
    ],
    "password.store": [],
    "verification.notice": [],
    "verification.verify": [
        {
            "name": "id",
            "required": true
        },
        {
            "name": "hash",
            "required": true
        }
    ],
    "verification.send": [],
    "password.confirm": [],
    "logout": [],
    "storage.local": [
        {
            "name": "path",
            "required": true
        }
    ]
}
}
export {};
