import { useState, useEffect } from "react"
import Router from 'next/router'

const baseUrl = 'https://api.smartrations.com:2096'

export default function Requestan(url, method = 'GET', body) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const fetchData = async (option) => {
        const timeout = option?.timeout ?? 5000
        const abortController = new AbortController()
        const id = setTimeout(() => abortController.abort(), timeout)
        setLoading(true)
        let code
        try {
            const res = await fetch(`${baseUrl}${url}`, {
                signal: abortController.signal,
                method: option?.method ?? method,
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(option?.body ?? body)
            })
            clearTimeout(id)
            const dataJson = await res.json()
            setError(false)
            code = res.status
            //console.log(dataJson)
            if (res.ok && res.status == 200) {
                data = dataJson
                setData(dataJson)
            }
            else if (res.status == 400) alert(typeof dataJson?.message === 'object' ? JSON.stringify(dataJson?.message) : dataJson?.message ?? 'Bir hata oluştu')
            else if (res.status == 401) {
                localStorage.removeItem('token')
                Router.push('/login')
            }
            else
                throw new Error(dataJson.message)
        }
        catch (e) {
            setError(e)
            console.log(`Bir hata oluştu: ${e.message}`)
            throw new Error(e.message ?? 'Beklenmeyen hata')
        }
        finally {
            setLoading(false)
            return { data, error, code }
        }
    }
    useEffect(() => {
        if (method == 'GET')
            fetchData()
    }, [])

    const reFetch = (opt) => fetchData(opt)
    const reFetchPromise = (opt) => new Promise((resolve, reject) => { reFetch(opt).then(a => resolve(data)).catch(e => reject(e)) })
    const getData = () => data
    //const getDataPromise = () => new Promise((resolve, reject) => { resolve(data) })

    //return new Promise((resolve, reject) => { })
    return { data, error, loading, reFetch, getData, reFetchPromise }

}