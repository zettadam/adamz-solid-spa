import {
  createResource,
  Match,
  Suspense,
  Switch,
  type Component,
  type JSX,
} from 'solid-js'

import { client } from '~/lib/pocketbase'
import Loading from '~/components/Loading'
import Error from '~/components/Error'

import PostsBasicList from './PostsListBasic'

const LatestPosts: Component = (props: { size?: number }): JSX.Element => {
  let size: number
  if (!props.size) size = 3

  const [data] = createResource(() =>
    client.collection('posts').getList(1, size, {
      filter: `published != null`,
      sort: `-published`,
    }),
  )

  return (
    <Suspense fallback={<Loading name="posts" />}>
      <Switch>
        <Match when={data.error}>
          <Error message={data.error} name="posts" />
        </Match>
        <Match when={data()}>
          <PostsBasicList data={data()} />
        </Match>
      </Switch>
    </Suspense>
  )
}

export default LatestPosts
