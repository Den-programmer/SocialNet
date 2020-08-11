// @ts-ignore
import savethatshit from '../components/Article/Music/MainMusicPage/track/music/SaveThatShit.mp3'
// @ts-ignore
import deathpunch from '../components/Article/Music/MainMusicPage/track/music/DeathPunch.mp3'
// @ts-ignore
import mydemons from '../components/Article/Music/MainMusicPage/track/music/MyDemons.mp3'
// @ts-ignore
import TherapySession from '../components/Article/Music/MainMusicPage/track/music/Therapy_Session.mp3'
import nf from '../components/Article/Music/Following/singer/images/nf.jpg'
import suicideBoys from '../components/Article/Music/Following/singer/images/suicideBoys.jpg'
import { InferActionTypes } from './redux'

export type trackType = {
    id: number
    singer: string
    singerPhoto: string
    song: string
    src: string
    duration: number
    time: number
    liked: boolean
    isMusicPlaying: boolean
}

export type singerType = {
    id: number
    photoSinger: string
    name: string
    location: string | null
    subscribers: number
    music: Array<trackType>
}

export type playlistType = {
    id: number
    title: string
    music: Array<trackType>
    count: number
}

export type trackNotificationType = {
    id: number
    title: string
}
export type navLinkType = {
    id: number
    title: string
    path: string
}
type musicPageType = {
    navLinks: Array<navLinkType>
    trackNotifications: Array<trackNotificationType>
    tracks: Array<trackType>
    likedTracks: Array<trackType>
    playlists: Array<playlistType>
    albums: Array<{}>
    following: Array<singerType>
}

const musicPage = {
    navLinks: [
        {
            id: 1,
            title: 'Liked Tracks',
            path: '/Music/likedTracks'
        },
        {
            id: 2,
            title: 'PlayLists',
            path: '/Music/PlayLists'
        },
        {
            id: 3,
            title: 'Albums',
            path: '/Music/Albums'
        },
        {
            id: 4,
            title: 'Following',
            path: '/Music/following'
        }
    ],
    trackNotifications: [
        {
            id: 1,
            title: 'Add to playlist'
        },
        {
            id: 2,
            title: 'Ignore track'
        },
        {
            id: 3,
            title: 'Notification2'
        },
        {
            id: 4,
            title: 'Notification3'
        },
        {
            id: 5,
            title: 'Share'
        },
    ],
    tracks: [
        {
            id: 1,
            singer: 'Lil Peep',
            singerPhoto: 'https://outstyle.org/images/news/5/7/6/unnamed.jpg',
            song: 'Save that shit',
            src: savethatshit,
            duration: 5,
            time: 0,
            liked: true,
            isMusicPlaying: false
        },
        {
            id: 2,
            singer: 'Scarlxrd',
            singerPhoto: 'https://i.ytimg.com/vi/DnsoxwrDsEk/maxresdefault.jpg',
            song: 'DeathPunch',
            src: deathpunch,
            duration: 4,
            time: 0,
            liked: true,
            isMusicPlaying: false
        },
        {
            id: 3,
            singer: 'Starset',
            singerPhoto: 'data:image/jpeg;base64,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',
            song: 'My Demons',
            src: mydemons,
            duration: 5,
            time: 0,
            liked: true,
            isMusicPlaying: false
        },
        {
            id: 4,
            singer: 'NF',
            singerPhoto: nf,
            song: 'Therapy Session',
            src: TherapySession,
            duration: 5,
            time: 0,
            liked: true,
            isMusicPlaying: false
        }
    ],
    likedTracks: [],
    playlists: [
        {
            id: 1,
            title: 'The First Playlist',
            music: [],
            count: 0
        },
        {
            id: 2,
            title: 'The Second Playlist',
            music: [
                {
                    id: 1,
                    singer: 'Lil Peep',
                    singerPhoto: 'https://outstyle.org/images/news/5/7/6/unnamed.jpg',
                    song: 'Save that shit',
                    src: savethatshit,
                    duration: 5,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                },
                {
                    id: 2,
                    singer: 'Scarlxrd',
                    singerPhoto: 'https://i.ytimg.com/vi/DnsoxwrDsEk/maxresdefault.jpg',
                    song: 'DeathPunch',
                    src: deathpunch,
                    duration: 4,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                },
                {
                    id: 3,
                    singer: 'Starset',
                    singerPhoto: 'data:image/jpeg;base64,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',
                    song: 'My Demons',
                    src: mydemons,
                    duration: 5,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                },
                {
                    id: 4,
                    singer: 'NF',
                    singerPhoto: nf,
                    song: 'Therapy Session',
                    src: TherapySession,
                    duration: 5,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                }
            ],
            count: 4
        }
    ],
    albums: [],
    following: [
        {
            id: 1,
            photoSinger: nf,
            name: 'NF',
            location: 'United States',
            subscribers: 5000000,
            music: []
        },
        {
            id: 2,
            photoSinger: 'https://outstyle.org/images/news/5/7/6/unnamed.jpg',
            name: 'Lil Peep',
            location: 'United States',
            subscribers: 4900000,
            musicTracks: []
        },
        {
            id: 3,
            photoSinger: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFhUVFxUVFxUXFRUVFRUVFRUWFxcXFxUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAgMEBQYBB//EADwQAAEDAgUCBAQDBgQHAAAAAAEAAgMEEQUSITFBE1EGImFxFIGRsTKhwQcVI0LR4SSCkrQWFyUzNXJz/8QAGQEAAgMBAAAAAAAAAAAAAAAAAAECAwQF/8QAJxEAAgICAgIDAAICAwAAAAAAAAECEQMhBBIxQRMiUTJxYZEFIzP/2gAMAwEAAhEDEQA/APFy5dTT999kuMFTE0XGBxReeSW5yg5GjYvtu49hvYbmylQYhYPaCA1wu4WFtD5deDz8lBjaRE7TS1vmdLqCFujP40kkQqxUzrklIS3ubwD6pContkgQhCiALi6hKhghCEACEITAEIQgQIQhMAQhCABCEIAEIQEAdXEIQwOFIcllIedFUxjeYoSM5XUqGFk/ELJmydYCmBL+NfkLM3lcQSLDcXtr8ymQ1JXQVapdv5EQCFxdUUMEIUunp+SPkpwg5PQiIhTTTA8JHwan8MgsioUg0hXDTFR+KSAYQnxTFLjoyTZNYpARULTy+CqlouWj26kd/uqOtoXRGzmuHum8U0rIqafgiIQhVkgQhCABCFOw2hMhudGjc9/QKcIOTpA2krYmkw9z7HYHb19lPxXDhDCO5PzV5C5osANBsqrxVLcNHqtssMceNv3RRHI5SpGdQhC5zNBwpuTZOFNy7KpgMIQupjofaloASgVJR/RC4o7n5JLxZczpKsc41SEdQhCgMeo48zh9VewQ33VZhLLk/JaGVoBIGw0XT4mNdbZTllQ2adgTbmN7JRKaer5SS8IpTf6dszsnGRMPH5qOGqZSQEqtZP1Ck68MJKFh2v8AMhIjoQDexV5R0muoVg7DBZPvH8IrJLwUnVkP8x+32XTQZx5hceq0FLhIJudlIlwuw0OiJZkkR7O9GCrfCpNzEf8AKf0KoqrCpozZ0bvpcfVeqCIt4SDIL2IWGThJ7VF8ck152eSdM9j9Clx0zzs0/ReoVlO22jQLeg3WeqojcpLHD9J/M/wzkGH21efkFbwkWsBYJ34IWOY2PHqkRx5TYrTh06RTkla2S4m6XVF4jfdzR6K7D9LLOY2+8nsFbynWMfHWyvQhC5TNhwpqYpwpqYKoBtC5ddTGPsddLSWhKCQgXVxdCmgBC4upgW2CfqriUqlwY6H3V5Oy1vZdfjf+aM2XyMFcsltCUxlym42USyJCqeC6u6GkTeHwrRUlHpeyjJUZlk7PQzBDZWETdE09tk/R6kAqEvBPH52WFNTtsANk9LTj2CVTR2T0jSVllI1xjaKyakB0Cqq7DreZaUsAKiV0d1lk22W9UkZyqylh4/VUk0VzsBbc331V9iUeipKmMqSlJD+r2IifGXhrhp37BN4zBGDeMkt9d/ndVkrCHjU2v+SnySAi1lu4u5GTkTSRAIWZxI3kctI5Zaqdd7j6lWc11FIu460NoQuLmM1AU1MnCm5AqwXkZQlXQmSpEhC4EoBJEQCVZLjjun3weW61QxUrERELrhqkqlqmMssGOrh7LS1ezT6D7LLYQfOfZaSV92t9rLqcV/8AWZeQNpTH2Tb36JgSaqbyUZPj7rZo6GawHr+a01FXWaR3WEo5tRfb0V5TzEBTklNWY49sc6Lp0lzop1DEXEAbqnp3K7wxp/FtY/VUydI0xTuy8bCV3KQuwykhOFc+bOjBaGGN5RVQghOEoZqq8c9hmhozlbREkqvkpeMv5LVzU2YFVksNr9gOe60UmYJSlEx9TQgG9tVFqYwAfZaSpaL2VNi0AOgWvj1EzycskkjOSO0KyrjqVq8TAa13oCskq+c/4o6+BfU6uIQVzmXiSkyJSaeVH2CE2XUi66mStEgBOsbdJAUmFttVoww9kGSYIwAk1culkg1GiivddaJSSQjj+PZJSjt7fqkrHIZJw51pB8wtBm0HoszC6zgfULSNOi3cV/RoqzLRxybZFyrIUoI91GlZl0vsrOv6YvkXhCola07iq+mCtIhfX+yi8jWhRgm7LKikGxWhweaxLTzt8lmaY2K0+GRbfdQk7iWderL2FqceQEhjEVI0sFgyM240NMka424SnvykAKHGwgkqS7ZUJ1snJWqE1E3ZV2ImzR66pNbcnQWVJidU4OGu2ivjyEYcvGkzr5BdUuJVmunCffK517fNQKthta2vK14Mvd0iiOBxdso8aluxx7rMrQY4bMt6rPp83+a/o6GFfUFxdQsJaJKae1PJiRyQ0JyoXLoUg0WIFlxz0lzki60SyVpERV1xdC6lVoDg2K4nA3QlNqE1XkBR2HfVX9FLdoPos8rfCJNPYq/jS3RHItGlL/4Y7KtnddLFSbZVGeeFpnM58cVMm0oIAvyL/Iq2pwqeg2V5T8LM3svSJUDVrcFZ5QVl6diusMnLCBuDpZP0EjUtItouSx8pEWgSnPWXKjRiY03kLro9ENdqpbYwsbT8F7K+Sm0WSxqOxNwt3MzhZ3HaYWuVlyKUPsTXWWjJUlO4ntfb6/2VnNRBti4Zhpm4NubFOUEOVw09Rfkd1a/Etdo76rpf8f2b7mPkUtHkPigAOsNsxt7cKgWu8dtjEzhHqP15WSK38n7Ssli/ihKEFCwssOFMPT5TEgS9jQhCLIUhEtKskhdBU4V7AcEJXWs1snoKl23fnlLjps2x1WqMV6EciAvlPKiSssSOymTU7xx7FRpTm15G/wDVLLG0A0puGS2Nu4UFdBWeE+rsGrNI11zfsm3u1UOhqL+/3U9gF77j7Fbl9laKJRomYePur2kCz9A6zlo6UKiUaZXZZ0zFbYcBnbdRKQ2ba26mwCxuN1JrRWpWaJoTFU091KgN2gpMjQRqsOV6N2JFc5xVtTEWGt1Xy22S2P0ssbk09GikTJH3VRi1i0qbLJYXJsFQ1FQXkhux5P8ARRzS7qmQjFp6IFM45teNFYdNjubXTUMIG6geJGGKFz2nsP8AVou1xcSjjUVpmDJJuZ514sZaZ4zA2cdRsVnypddNmcVETzO2aYqkkcXF2yLLK02TElMuTxCYeqxo4upN0JkrJAKU0psJYQnRAeDrKZRO1t6KvCk00+UrbjnbEXkbtLJqSgjdrax9E3BUDupbdVvi1NUylpoo6yhLNd29+yiLXCnzC1r3VJimEuj8wBLfssfI43X7RJQyJ6K6N5abhXdFUB2o35HdUSVHIWm4VOLL0f8AgnJWa6mjvqPmOQtLQNusdhtcH6g2eOOHLWYPVB3o7lvPyW9xjONoxTg0zRU8WitKGDS6h0jwraAgDRYstonjiSKYWFl2TlNsCbkktysklZrjoGMukFyZmrLbKtr6k5Mo5+yr+Fsl3GMQr3Suyt/AD/qPcrsEXdco41ZRxA6KzHguXjSI5MvWNIQKcOb5TqvPPGGJkuc3N5WXA7F3JWm8U4i6mGRps5w43APK8wxWoLnZd+T7rqX0jf8AoyY49nbIL9r+qbT85FgAmQsc19jWPcA2H1TTyuBF0pTtAJTMoT5ITb3LOxojISl1MlQ6NEpq4ugqJEUlsb3SWhLur8UfbEOiU+yt6CbNYDfZUrNTZOxSmN4cOD9lshk6uxSVo9FhYyKMHymxAde4DnHW2f8AlPb2S7RStdkBBA8zHbge/IWVixF7g61iySxLTuCN7Hg/oruhqmtaWg3cQBfs0bNWtb2Y5RaM7jWA5SXx7cjss+5pGhXo+UuVRiODCS5YNRuePkf02WbNxlLcS2Gb0zIRPIIIWkwzEw62Y2cNnf1VBV0ro3WcLJpjyFlhkljdFzipHq+E4z/K/wCq00NSDsvG8Mxe1mvOnB5C0dDjroyDe478Fa/rkVoqcWj0+M6JqbVZqh8VRkamx/JWTcXjcNHN+oVTwsPkommIH091Blp7lKbXt7j6hM1OKRN1zt04ve/0QsLsi8pMhiAUTH8VZTi4N3dux7KlxLxQLeQG9rEnb5dlj8Qq3PJLnf2V6x9dsik5vYjGMUdI50rzcna6o2A6uPK7NIZHabD7LvUG3ZUOfd36NUVSGHHVcIsSEPK7JuqJPYxCEIVQziZkTxUd6rBeRFl1cuhA9EldASGkpTCkIWu3SUK1SoByMXKnS0RFiWluYXFwQHDu2+6iRDbLuE/JMR5Xklvpx6tvstEHS2RbGmPcw+V1k9FXvB4UaTXX397Dumkd3HwFWaemxSUCwLdfmpba17wMz22ac1vMBp3ssjHMQn46sjb6FaI8heyt416NfXQuqGi8bHdnMdlP57rJ12EzRaujcB3tp9VaUGOObodAtDhWMAsyyOD99wNQePVSnjhlRBSlD+jzxSKWsczTcchXeI4Fnc98ZaLnRnFln5oXNNnCxWOcMmF2XRlGRbxzB2rHf5Tun4nu9VngVMo8TkjN2u+qtx8lXvQOJtsAwWSoda4aO5P6bq+/4ZhjeDJIbBpzaBo3FnAn5jleau8Qz3uHWPcaH6hRJsSkcbueSfUk/dWy5Kb0yn4ZM9J8Q0uHwDWRzja+VjwT6a5bBeb1tSXuyt2vp6poyPfopBaI2bXc7nsq5Tc1Xr9LIQ6jghDGep3KrnO1U+aXMxVxVeV9UqJo6V2Ua/RJSpTt7Khu4sYhCEKtvYzhUeRSCmJVH2MbQhCkIkeyU0Ju6dUBnUBcWs8N+HqWWmZUVUs7erVijjbCyN1nGNj8zy8jTz207J2Iyw0SpZS611Kxqi+HqZ6fNm6M0sWa1s3Tkcy5HF7KG3dXJ6pCFyHYdgm1JoDD1B8QZRF5s5iDHSfhOXKHkNPmy3udrq68b4PSUcxp4JKh8jMheZWxNZlkiZI3IWG5PnF7hE52xmcQuIULAmU1QLZX/I9vdcdNlPlKtx4YP7rGJFxsanoZLCwjyH+JfvnGX6KgeRwFbHI6sj12WrMTc3Q+n5p11Y1wGZtwe4uFR3V94RwuKpfMJ5JGRwU8tS7pBpeekWeUB+mzj9FcuS62R+NEWSkjO1x6jUKD8Pd2Vpv6q/x/D4IYaaopZZnR1HXGWZsbXtMDmNP4CQQc/wCSrWVEZ1Aym2v9kVCeyW0MnDjy4fRHwrRzdEtSR/Va/CvC1LN8LFJPUCorKeSoZljiMDAwTENcS7Of+ydhz9FL44+gVmPc8DZIfLcW+YUcPvquXSeVDHWP0smirrwlhMVTLI2Z8jI4qeeocYw0vIgZmLWh2lyL7qBiwp+p/hTMY7DWYRtfm1vpGSLbc91TKdqgohoKEqPLmGa+W4zZbZst9bX0va9rqu9DEoWp8QYRh8VLDPBJVufUte6JsjIAwCKcxP6ha64PlcRa/F+VlbqFgcJTD3XTkjwmE0MEIQpCHmtTgTQeL7pfVCgMU5bHwW7NCaaqa74KqnETJhYup64Mb05GC9/wuaHDlp30WKdIFqPDni2CCnbBPSumEdT8XG5s/RLZMjGWIyOzD+GO25SApcTpXwzSwyEF8Uj43kEkF7HFriCdSLg6qOE7jGJ/ETzTkZTNLJKWjUNMjy+1+bZrXUUShS7CFybH2K1X7Tf/ACc//rT/AO1hWSdIO6tfE2OisqZKjLkziMZL5rdOJkf4rC98l9uUrGV6E31QgyBOxHrn7um/dpo+jL0RhTavqZHZPiRUfFlma1s2RxFt9LLye61v/MSX481dn9E3b8J1n9LpGEw5NraDW+XdY7O3uknQDl1q/wBnzwDXFzczRh9US29swzRXGbi40ush1QrPAsdFN8R5M/XppabfLk6uXz7G9su2m+6bkBpf2kSxRvgo6eLJTwsM0DzIZDMyrDJM9yPKPLa2uoKxgKsMUx4TwUsTmeemY+Lq5r54i/PG0ttpku4A3OhVUJQmptKgHsy3GDUz6umjoJwWTiKSpw6a480QzmWncWm4Y7pyFpOxB4sDghIO/wB1s8K8cwQtpnupC+opYH08UvxDmx5X9UXdF0zcjrO/m1sNkOTYGPaUJsSAc/dBkHdJyGa/9nBZ1qrqBxZ+767OGkNeWdLzBriCA617Eg+yz2JvgdJemZKyOws2V7ZH35OZrWi3yUjwrj7KSWR8kJlZLBNTvYH9I5Zm5XEPyusbeih4rV075L08L4Y8oGR0vWObW7s+Vum2luErAYuglNmQd1wyDukBqfEZ/wCn4V/8qv8A3sqypcrTEcaEtPSQZMvwrJWZr3z9Wd0t7W8ts1udlV5whANuK4nLtXTl7qVgNITmiEdgGkIQoACEIQAK7r6ekbSQSR9TryGRrwZ43NZ08nm6YiDgH5nWu7TLuVSIQBo/CWF0c4k+Lm6VnQtZ/FEQPULg4k9N5sLN1sAL6kBVFfTtE8kcRJYJHMYXObctDyGlzh5b2tc7KGhAGi8U4LTQNjdTVTJ945bPaS2VouXNFgek7W29spudQk+HsLpJoiZ6joyGaONly3Jlc15cX6ZmDygB+oBIuLG4z6EASsVgZHPKyN2ZjJHtY64OZjXENNxobgA3C0ni7AKOnhZJTzZ3OeGlpqIJXZSwnNkiboLgal3I33GRQgC88P4ZTTRzGeoED2mMRE2LDm6hfnaBmIswAFuxcL76RvEdLDFUOZTvL4gIy1zi0uOaNjiCWaXDnEWG1rKsQgCxxqkijMQifnDoIZH+Zrssj2Avb5RpY6WOo5V5T4BSOw74kzWnDHuyOqIWjM2VzQ0QhpkN2AGxIuT2tfJIQBa+F6GKepZHO4tjIeS4PjjNxG4tGeTyi7g0c+iX4qw6GnqDHA8PZlYQRKyXVzQXAvY0NuDfQbdyqdCAJ+J0sTGU5jfmMkOeQZmnJJ1ZW5bD8PlYw2Ovm9VocA8P0csEUkshBcZuq74umh6AZ+A9GRpe+/oVj0IAl4RAySeGOV2WN8kbXuuG5WOeA52Y6CwJNzorHH8NpooopKeo6vUkm8pLQ+ONjYcgkYPwvzPlFwS1waCOVRoQBrPBWA0lS2Q1MvTLXxtb/iIIG5XB2Zx6gc42s3UDvvssoVxCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCAP/Z',
            name: 'Starset',
            location: null,
            subscribers: 5900000,
            music: []
        },
        {
            id: 4,
            photoSinger: suicideBoys,
            name: '$uicide boy$',
            location: 'United States',
            subscribers: 2900000,
            music: []
        }
    ],
} as musicPageType

const reducerMusic = (state = musicPage, action: ActionTypes):musicPageType => {
    switch (action.type) {
        case `sn/musicPage/LIKE_TRACK`:
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    if (track.id === action.trackId) {
                        if (track.liked) return { ...track, liked: false }
                        return { ...track, liked: true }
                    } else {
                        return track
                    }
                })
            }
        case `sn/musicPage/SET_LIKED_TRACKS`:
            return {
                ...state,
                likedTracks: state.tracks.filter((track: trackType) => {
                    if (track.liked) return true
                })
            }
        case `sn/musicPage/CHOOSE_TRACK`:
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    if (track.id === action.trackId) {
                        if (track.isMusicPlaying) {
                            return { ...track, isMusicPlaying: false }
                        } else {
                            return { ...track, isMusicPlaying: true }
                        }
                    } else {
                        return { ...track, isMusicPlaying: false }
                    }
                })
            }
        case `sn/musicPage/SET_CURRENT_TRACK_TIME`:
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    if (track.id === action.trackId) return { ...track, time: action.time }
                    return track
                })
            }
        case `sn/musicPage/PAUSE_ALL_TRACKS`:
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    return { ...track, isMusicPlaying: false }
                })
            }
        case `sn/musicPage/ADD_PLAYLIST`:   
            const newPlaylist = {
                id: state.playlists.length + 1,
                title: action.title === '' ? 'Untitled' : action.title,
                music: [],
                count: 0
            }
            return {
                ...state,
                playlists: [...state.playlists, newPlaylist]
            }
        case `sn/musicPage/DELETE_PLAYLIST`:
            return {
                ...state,
                playlists: state.playlists.filter((playlist: playlistType) => {
                    if(playlist.id !== action.playlistId) return true
                })
            } 
        case `sn/musicPage/EDIT_PLAYLIST`: 
            return {
                ...state,
                playlists: state.playlists.map((playlist: playlistType) => {
                    if(playlist.id === action.playlistId) return { ...playlist, title: action.newTitle }
                    return playlist
                })
            }    
        case `sn/musicPage/ADD_TRACK_TO_PLAYLIST`:
            const newTrack = state.tracks.filter((t: trackType) => {
                if(t.id === action.trackId) return true
            }).find(track => track)
            return {
                ...state,
                // @ts-ignore
                playlists: state.playlists.map((p:playlistType) => {
                    if(p.id === action.playlistId) return { ...p, music: [...state.playlists[action.playlistId - 1].music, newTrack], 
                        count: state.playlists[action.playlistId - 1].music.length }
                    return p
                })
            }    
        default:
            return state
    }
}

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    likeTrack: (trackId: number) => ({ type: `sn/musicPage/LIKE_TRACK`, trackId } as const),
    setLikedTracks: () => ({ type: `sn/musicPage/SET_LIKED_TRACKS` } as const),
    chooseTrack: (trackId: number) => ({ type: `sn/musicPage/CHOOSE_TRACK`, trackId } as const),
    setTrackCurrentTime: (trackId: number, time: number) => ({ type: `sn/musicPage/SET_CURRENT_TRACK_TIME`, trackId, time } as const),
    unsetIsMusicPlaying: () => ({ type: `sn/musicPage/PAUSE_ALL_TRACKS` } as const),
    addPlaylist: (title: string) => ({ type: `sn/musicPage/ADD_PLAYLIST`, title } as const),
    deletePlaylist: (playlistId: number) => ({ type: `sn/musicPage/DELETE_PLAYLIST`, playlistId } as const),
    changePlaylistTitle: (newTitle: string, playlistId: number) => ({ type: `sn/musicPage/EDIT_PLAYLIST`, newTitle, playlistId } as const),
    addTrackToPlaylist: (trackId: number, playlistId: number) => ({ type: `sn/musicPage/ADD_TRACK_TO_PLAYLIST`, trackId, playlistId } as const)
}

export default reducerMusic