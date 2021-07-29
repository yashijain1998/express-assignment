let usersList = {
    "users": [
        {
            name : "yashi",
            group : [{
                name:'north',
                city:[{
                    id: 1269515,
                    name:"Jaipur"
                },
                {
                    id: 1273294,
                    name:"Delhi"
                }
            ]
            },
            {
                name:'east',
                city:[{
                    id: 1269843,
                    name:"Hyderabad"
                }]
            },
        ]
        },
        // {
        //     name : "aanchal",
        //     group : [{
        //         name:'north',
        //         city:[{
        //             id: Math.random().toString(36).substr(2, 9),
        //             name:"Lucknow"
        //         }]
        //     },
        //     {
        //         name:'east',
        //         city:[{
        //             id: Math.random().toString(36).substr(2, 9),
        //             name:"Patna"
        //         }]
        //     }
        // ]
        // }

    ]
}

module.exports = usersList.users;