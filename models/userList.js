let usersList = {
    "users": [
        {
            name : "yashi",
            group : [{
                name:'north',
                city:[{
                    id: Math.random().toString(36).substr(2, 9),
                    name:"Delhi"
                }]
            },
            {
                name:'east',
                city:[{
                    id: Math.random().toString(36).substr(2, 9),
                    name:"hyderabad"
                }]
            }
        ]
        }

    ]
}

module.exports = usersList.users;