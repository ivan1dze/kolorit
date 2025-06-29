'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogPage.module.css';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    featured_image_url: string;
    published_at: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetch('https://api.colordrive.by/api/blog/posts/')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>Блог</h1>
            <div className={styles.list}>
                {posts.map(post => (
                    <Link href={`/blog/${post.id}`} key={post.id} className={styles.card}>
                        <div className={styles.image}>
                            <Image
                                src={post.featured_image_url}
                                alt={post.title}
                                width={483}
                                height={258}
                                unoptimized
                            />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.heading}>{post.title}</h2>
                            <p className={styles.excerpt}>{post.excerpt.slice(0, 500)}...</p>
                            <span className={styles.date}>
                {new Date(post.published_at).toLocaleDateString()}
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
