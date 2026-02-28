'use client';

import { useEffect, useState } from "react";
import css from "./edit.module.css";
import Image from "next/image";
import  { updateMe, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";


export default function Edit (){
 const [error, setError] = useState<string>('');
const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');
const [avatar, setAvatar] = useState('');
const [isLoading, setIsLoading] = useState(false);
const router = useRouter();

const user = useAuthStore((state) => state.user);
const setUser = useAuthStore((state)=> state.setUser);

useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError('');

          try {
        if (user) {
          if (cancelled) return;
          setUserName(user.username ?? '');
          setEmail(user.email ?? '');
          setAvatar(user.avatar ?? '');
          return;
        }

        const me = await getMe();
        if (cancelled) return;

        setUser(me);
        setUserName(me.username ?? '');
        setEmail(me.email ?? '');
        setAvatar(me.avatar ?? '');
      } catch (e) {
        if (!cancelled) setError('Failed to load profile.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [user, setUser]);

const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
  setUserName(e.target.value);
}

const handleSaveUser = async (e : React.FormEvent)=> {
e.preventDefault();
setError("");
if (userName.trim().length === 0) { setError("Username cannot be empty");
  return;
}
try {
      setIsLoading(true);

      const updated = await updateMe({ username: userName.trim() });
      setUser(updated);

      router.push('/profile');
    } catch (e) {
      setError('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  }

const handleCancel = ()=>{
 router.push('/profile');
}

    return (
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={avatar || "https://ac.goit.global/fullstack/react/default-avatar.png"}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} onSubmit={handleSaveUser}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
          value={userName}
          onChange={handleChange}
        />
      </div>

      <p>Email: {email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton} >
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
    {error && <p className={css.error}>{error}</p>}
  </div>
</main>
)
}

