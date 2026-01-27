import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import pfpFallback from '../assets/profileblue.jpeg'
import pen from '../assets/pen.png'
import githubIcon from '../assets/github.png'
import linkedinIcon from '../assets/linkedin.png'

/** ✅ API BASE (Vite ONLY, no fallback allowed) */
const API_BASE = import.meta.env.VITE_API_URL
if (!API_BASE) {
  throw new Error('VITE_API_URL is not defined')
}

/** Parse JWT payload (no library needed) */
const parseJwt = (token) => {
  try {
    if (!token) return null
    const payload = token.split('.')[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(decoded)))
  } catch {
    return null
  }
}

/** Helper: convert Google Drive share link to direct download/view link */
const googleDriveDirectLink = (url) => {
  if (!url) return null
  const fileIdMatch = url.match(/\/d\/([A-Za-z0-9_-]+)/)
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`
  }
  const idParamMatch = url.match(/[?&]id=([A-Za-z0-9_-]+)/)
  if (idParamMatch) {
    return `https://drive.google.com/uc?export=download&id=${idParamMatch[1]}`
  }
  return url
}

/** Helper: sanitize URL */
const sanitizeUrl = (url) => {
  if (!url) return null
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url) || /^mailto:/.test(url)) return url
  if (url.startsWith('//')) return `https:${url}`
  return `https://${url}`
}

const Profile = (props) => {
  const { id } = useParams()
  const location = useLocation()
  const stateUser = location?.state?.user

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState({
    name: props.name || 'J Krishna Prasad',
    title: props.title || 'Python developer',
    role: props.role || 'Club Member',
    section: props.section || '',
    bio: props.bio || 'I am from GuruNanak University.',
    avatarUrl: props.avatarUrl || '',
    skills: props.skills || ['Python'],
    resumeLink: props.resumeLink || '',
    resumeDirectLink: props.resumeDirectLink || '',
    githuburl: props.githuburl || '',
    linkedinurl: props.linkedinurl || '',
  })

  const getLoggedInUserId = () => {
    if (typeof window === 'undefined') return null
    const token =
      localStorage.getItem('token') ||
      localStorage.getItem('jwtToken') ||
      sessionStorage.getItem('token')
    const payload = parseJwt(token)
    return payload?._id || payload?.id || null
  }

  useEffect(() => {
    let cancelled = false

    const fetchUser = async () => {
      setLoading(true)
      setError(null)

      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('jwtToken') ||
        sessionStorage.getItem('token') ||
        ''

      const axiosConfig = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {}

      const candidatePaths = [`/members/${id}`]

      try {
        if (stateUser) {
          const st = stateUser
          setUser((prev) => ({
            ...prev,
            name: st.name || prev.name,
            title: st.title || prev.title,
            role: st.role || prev.role,
            section: st.section || prev.section,
            bio: st.bio || prev.bio,
            avatarUrl: st.avatarUrl || st.profilePic || prev.avatarUrl,
            skills: st.skills?.length ? st.skills : prev.skills,
            resumeLink: st.resumeLink || st.resume || prev.resumeLink,
            resumeDirectLink: st.resumeDirectLink || prev.resumeDirectLink || '',
            githuburl: st.githuburl || st.github || prev.githuburl,
            linkedinurl: st.linkedinurl || st.linkedin || prev.linkedinurl,
          }))
          setLoading(false)
        }

        let got = null
        let lastErr = null

        for (const p of candidatePaths) {
          try {
            const res = await axios.get(`${API_BASE}${p}`, axiosConfig)
            got = res.data?.member || res.data
            if (got) break
          } catch (err) {
            lastErr = err
            if (err.response?.status === 404) continue
          }
        }

        if (got && !cancelled) {
          setUser((prev) => ({
            ...prev,
            name: got.name || prev.name,
            title: got.title || prev.title,
            role: got.role || prev.role,
            section: got.section || prev.section,
            bio: got.bio || prev.bio,
            avatarUrl: got.avatarUrl || got.profilePic || prev.avatarUrl,
            skills: got.skills?.length ? got.skills : prev.skills,
            resumeLink: got.resumeLink || got.resume || prev.resumeLink,
            resumeDirectLink: got.resumeDirectLink || '',
            githuburl: got.githuburl || got.github || prev.githuburl,
            linkedinurl: got.linkedinurl || got.linkedin || prev.linkedinurl,
          }))
        } else if (!got && !stateUser) {
          throw lastErr || new Error('User not found')
        }
      } catch (err) {
        if (!cancelled) {
          const status = err.response?.status
          if (status === 401 || status === 403) setError('You are not authorized.')
          else if (status === 404) setError('Profile not found.')
          else setError('Unable to load profile.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (id) fetchUser()
    else {
      setLoading(false)
      setError('No user id provided in URL.')
    }

    return () => {
      cancelled = true
    }
  }, [id, stateUser])

  const loggedInUserId = getLoggedInUserId()
  const canEdit = loggedInUserId && id && String(loggedInUserId) === String(id)

  const raw = user.resumeDirectLink || user.resumeLink || ''
  const resumeHref = sanitizeUrl(googleDriveDirectLink(raw))

  const handleResumeClick = (e) => {
    e.preventDefault()
    if (!resumeHref) return alert('No resume uploaded.')
    window.open(resumeHref, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="relative min-h-screen w-full mt-12 flex items-center justify-center py-12 px-1">
      <div className="relative w-[90%] bg-gray-950 rounded-2xl p-6">
        <div className="flex justify-end mb-4">
          {canEdit && (
            <Link to="/editprofile" className="flex items-center gap-2 text-white">
              Edit Profile <img src={pen} className="h-5 w-5" alt="edit" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="text-center text-white">Loading…</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src={user.avatarUrl || pfpFallback}
                className="w-40 h-40 rounded-full object-cover"
                alt="avatar"
              />

              <div>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-indigo-300">{user.title}</p>

                <button
                  onClick={handleResumeClick}
                  className="mt-4 bg-indigo-600 px-4 py-2 rounded text-white"
                >
                  Resume
                </button>
              </div>
            </div>

            <p className="mt-6 text-gray-300">{user.bio}</p>

            <div className="mt-6 flex gap-3">
              <a href={user.githuburl} target="_blank" rel="noreferrer">
                <img src={githubIcon} className="h-10 w-10 bg-white rounded" />
              </a>
              <a href={user.linkedinurl} target="_blank" rel="noreferrer">
                <img src={linkedinIcon} className="h-10 w-10 bg-white rounded" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Profile
