'use client'

import { KBarSearchProvider } from 'pliny/search/KBar'
import { useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'

export const SearchProvider = ({ children }) => {
  const router = useRouter()
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: '',
            shortcut: ['h', 'h'],
            section: 'Home',
            perform: () => router.push('/'),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: '',
            shortcut: ['p', 'p'],
            section: 'Home',
            perform: () => router.push('/projects'),
          },
          {
            id: 'about',
            name: 'About',
            keywords: 'about',
            shortcut: ['a', 'a'],
            section: 'Home',
            perform: () => router.push('/about'),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json.map((post: Blog) => ({
            id: post.path,
            name: post.title,
            keywords: post.body.raw,
            section: 'Blog',
            subtitle: post.tags.join(', '),
            perform: () => router.push('/' + post.path),
          }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
