

export default function handler(req, res) {
    res.status(200).json(

        [{
            word: "sail",
            mean: [
                {
                    type: "verb",
                    pronon: [
                        "/seɪl/",
                        "/seɪl/"
                    ],
                    define: [
                        "When a boat or a ship sails, it travels on the water:",
                        "to control a boat that has no engine and is pushed by the wind:",
                        "When a ship sails, it starts travelling, and when people sail from a particular place or at a particular time, they start travelling in a ship:"
                    ]
                },
                {
                    type: "noun",
                    pronon: [
                        "/seɪl/",
                        "/seɪl/"
                    ],
                    define: [
                        "a sheet of material attached to a pole on a boat to catch the wind and make the boat move:",
                        "On a windmill, a sail is any of the wide blades that are turned by the wind in order to produce power."
                    ]
                }
            ]
        }, {
            word: "sailboat",
            mean: [
                {
                    "type": "noun",
                    "pronon": [
                        "/ˈseɪl.bəʊt/",
                        "/ˈseɪl.boʊt/"
                    ],
                    "define": [
                        "a small boat with sails"
                    ]
                }
            ]
        }, {
            word: "sailing",
            mean: [
                {
                    "type": "noun",
                    "pronon": [
                        "/ˈseɪ.lɪŋ/",
                        "/ˈseɪ.lɪŋ/"
                    ],
                    "define": [
                        "the sport or activity of using boats with sails:",
                        "an occasion when a ship leaves a port:"
                    ]
                }
            ]
        },]

    )
}