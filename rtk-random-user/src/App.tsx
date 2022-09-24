import React, {MouseEvent, useState, useEffect} from "react"
import {useGetUsersQuery} from "./services/users"
import {
    FaEnvelopeOpen,
    FaUser,
    FaCalendarTimes,
    FaMap,
    FaPhone,
    FaLock,
} from "react-icons/fa"
import "./App.css"

interface User {
    image: string
    phone: string
    email: string
    password: string
    age: number
    street: string
    name: string
}

function App() {
    const [person, setPerson] = useState<User>()
    const [value, setValue] = useState("Random Person")
    const [title, setTitle] = useState("name")

    const {data, isLoading, refetch} = useGetUsersQuery()
    const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg"

    useEffect(() => {
        if (data) {
            const randomPerson = data.results[0]
            const { phone, email } = randomPerson
            const { large: image } = randomPerson.picture
            const { password } = randomPerson.login
            const { first, last } = randomPerson.name
            const {
                dob: { age },
            } = randomPerson
            const {
                street: { number, name },
            } = randomPerson.location
            const newPerson = {
                image,
                phone,
                email,
                password,
                age,
                street: `${number} ${name}`,
                name: `${first} ${last}`,
            }
            setPerson(newPerson)
            setTitle("name")
            setValue(newPerson.name)
        }
    }, [data])

    const handleValue = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement
        if (target.classList.contains("icon")) {
            const newValue = target.dataset.label ||""
            setTitle(newValue || "")
            if (person) {
                // @ts-ignore
                setValue(person[newValue])
            }
        }
    }

    return (
        <main>
            <div className="block bcg-black"></div>
            <div className="block">
                <div className="container">
                    <img
                        src={(person && person.image) || defaultImage}
                        alt="random_user"
                        className="user-img"
                    />
                    <p className="user-title">My {title}</p>
                    <p className="user-value">{value}</p>
                    <div className="values-list">
                        <button
                            data-label="name"
                            onMouseOver={(e) => handleValue(e)}
                            className="icon"
                        >
                            <FaUser/>
                        </button>
                        <button
                            data-label="email"
                            onMouseOver={handleValue}
                            className="icon"
                        >
                            <FaEnvelopeOpen/>
                        </button>
                        <button data-label="age" onMouseOver={handleValue} className="icon">
                            <FaCalendarTimes/>
                        </button>
                        <button
                            data-label="street"
                            onMouseOver={handleValue}
                            className="icon"
                        >
                            <FaMap/>
                        </button>
                        <button
                            data-label="phone"
                            onMouseOver={handleValue}
                            className="icon"
                        >
                            <FaPhone/>
                        </button>
                        <button
                            data-label="password"
                            onMouseOver={handleValue}
                            className="icon"
                        >
                            <FaLock/>
                        </button>
                    </div>
                    <button className="btn" type="button" onClick={() => refetch()}>
                        {isLoading ? "loading..." : "random user"}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default App
