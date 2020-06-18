import config from 'react-global-configuration'

config.set({
    base: "./data",
    items: "/item.json",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})


export default config