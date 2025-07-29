"use client"
import React, { useEffect, useState } from 'react'

const HomeComp = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [count, setCount] = useState(0)
    const [bookmarkUsers, setBookMarkUsers] = useState(JSON.parse(localStorage.getItem("bookmark") || "[]"))

    const fetchUsers = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const response = await res.json()
            setUsers(response)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleSaveUser = (id) => {
        const ids = JSON.parse(localStorage.getItem("bookmark") || "[]")
        ids.push(id)
        setBookMarkUsers(ids)
        localStorage.setItem("bookmark", JSON.stringify(ids))
    }

    const handleDeleteUser = (id) => {
        const ids = JSON.parse(localStorage.getItem("bookmark") || "[]")
        const index = ids.indexOf(id)
        ids.splice(index, 1)
        setBookMarkUsers(ids)
        localStorage.setItem("bookmark", JSON.stringify(ids))
    }

    const abcTest = () => {
        setCount(() => count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
        // 5
    }

  return (
    <div className='m-10'>
       <input type="text" name='search' className='border border-gray-300 my-4 p-2 text-sm w-96 h-10 rounded-lg' placeholder='Enter name or email' onChange={(e) => setSearch(e.target.value)} />
       <div className='wrapper'>
        <div className="heading flex gap-4">
            <h1 className='text-lg font-bold'>Name</h1>
            <h1 className='text-lg font-bold'>Email</h1>
            <h1 className='text-lg font-bold'>Actions</h1>
        </div>
        <div className="content">
            {users
            .filter((item) => {
                if(search === "") {
                    return item
                }
                return item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search)
            })
            .map((item) => {
                return (
                <div key={item.id} className='flex gap-4 items-center my-2'>
                <h1>{item.name}</h1>
                <h1>{item.email}</h1>
                {
                bookmarkUsers.includes(item.id)
                ?
                <button onClick={() => handleDeleteUser(item.id)} className='bg-red-400 text-white p-2 rounded-lg cursor-pointer'>Remove from bookmarks</button>
                :
                <button onClick={() => handleSaveUser(item.id)} className='bg-green-500 text-white p-2 rounded-lg cursor-pointer'>{bookmarkUsers.includes(item.id) ? "Remove from bookmarks" : "Bookmark"}</button>

                }
                </div>
                )
            })}
        </div>
        <button onClick={abcTest} className="bg-black text-white">Click Me</button> {count}
       </div>
    </div>
  )
}

export default HomeComp