'use client';

import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import styles from './BlogList.module.css';

interface BlogSearchModalProps {
    isOpen: boolean;
    isMounted: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    query: string;
    results: any[];
    selectedIndex: number;
    baseBlogPath: string;
    onClose: () => void;
    onQueryChange: (q: string) => void;
    onIndexChange: (i: number) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

export function BlogSearchModal({ isOpen, isMounted, inputRef, query, results, selectedIndex, baseBlogPath, onClose, onQueryChange, onIndexChange, onKeyDown }: BlogSearchModalProps) {
    if (!isMounted || !isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
                <div className={styles.modalSearchHeader}>
                    <div className={styles.modalSearchBox}>
                        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <input ref={inputRef} type="text" value={query}
                            onChange={(e) => { onQueryChange(e.target.value); onIndexChange(0); }}
                            placeholder="Search" className={styles.modalSearchInput} aria-label="Type to search" />
                        <kbd className={styles.modalEscKey} onClick={onClose} role="button">ESC</kbd>
                    </div>
                </div>

                <div className={styles.modalBody}>
                    {!query.trim() ? (
                        <div className={styles.modalEmptyState}>Type to search...</div>
                    ) : results.length === 0 ? (
                        <div className={styles.modalEmptyState}>No results found for &ldquo;{query}&rdquo;</div>
                    ) : (
                        <div className={styles.modalResultsList}>
                            {results.map((post: any, idx: number) => {
                                const slug = post.slug || post.id || post._id;
                                return (
                                    <Link key={slug} href={`${baseBlogPath}/${slug}`} onClick={onClose}
                                        onMouseEnter={() => onIndexChange(idx)}
                                        className={`${styles.modalResultItem} ${idx === selectedIndex ? styles.modalResultItemActive : ''}`}>
                                        <span className={styles.modalResultTitle}>{post.title}</span>
                                        <span className={styles.modalResultCategory}>{post.category || 'Guide'}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className={styles.modalFooter}>
                    <span className={styles.footerKeyGroup}><kbd className={styles.footerKey}>↑↓</kbd><span>Navigate</span></span>
                    <span className={styles.footerKeyGroup}><kbd className={styles.footerKey}>↵</kbd><span>Open</span></span>
                    <span className={styles.footerKeyGroup}><kbd className={styles.footerKey}>esc</kbd><span>Close</span></span>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default BlogSearchModal;
