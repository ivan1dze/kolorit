'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './BlogPost.module.css';

interface ContentBlock {
    id: number;
    block_type: 'text';
    text_content?: string;
    image_url?: string;
    image_caption?: string;
    order: number;
}

interface BlogPost {
    id: number;
    title: string;
    featured_image_url: string;
    published_at: string;
    content_blocks: ContentBlock[];
}

export default function BlogPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        fetch(`http://localhost/api/blog/posts/${id}/`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    if (!post) return <div className={styles.loading}>Загрузка...</div>;

    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.date}>
                {new Date(post.published_at).toLocaleDateString()}
            </div>

            {post.featured_image_url && (
                <div className={styles.featured}>
                    <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        width={1216}
                        height={400}
                        unoptimized
                    />
                </div>
            )}

            <div className={styles.content}>
                {post.content_blocks
                    .sort((a, b) => a.order - b.order)
                    .map(block => (
                        <div key={block.id} className={styles.block}>
                            {block.text_content && (
                                <p className={styles.text}>
                                    {block.text_content.split('\n').map((line, i) => (
                                        <span key={i}>
                      {line}
                                            <br />
                    </span>
                                    ))}
                                </p>
                            )}

                            {block.image_url && (
                                <div className={styles.blockImage}>
                                    <Image
                                        src={block.image_url}
                                        alt={block.image_caption || ''}
                                        width={1216}
                                        height={400}
                                        unoptimized
                                    />
                                    {block.image_caption && (
                                        <div className={styles.caption}>{block.image_caption}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </main>
    );
}
