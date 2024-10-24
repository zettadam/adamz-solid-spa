import { createResource, Match, onCleanup, Switch } from 'solid-js'
import { Title } from '@solidjs/meta'

import { client } from '~/lib/pocketbase'
import PostDetail from '~/features/posts/PostDetail'
import NoteDetail from '~/features/notes/NoteDetail'
import CodeDetail from '~/features/code/CodeDetail'
import LabDetail from '~/features/labs/LabDetail'
import FeedDetail from '~/features/feeds/FeedDetail'
import type { CollectionName } from '~/lib/api'

import Error from './Error'
import Loading from './Loading'

import { sectionTitleMap } from '~/features/generic/constants'

const Detail = (props: { identifier: string; name: CollectionName }) => {
  const [data] = createResource(
    () => props.name,
    async (name) => {
      const ac = new AbortController()
      onCleanup(() => ac.abort())

      const data = await client.collection(name).getOne(props.identifier)
      return data
    },
  )

  return (
    <main class={`${props.name} detail`} id="content">
      <Switch>
        <Match when={data.loading}>
          <Loading name={props.name} detail />
        </Match>
        <Match when={data.error}>
          <Error message={data.error.message} name={props.name} />
        </Match>
        <Match when={data()}>
          <Title>
            {data()?.title || data()?.name}—{sectionTitleMap[props.name]}—Adam
            Ziolkowski
          </Title>
          <Switch>
            <Match when={'posts' === props.name}>
              <PostDetail data={data()} />
            </Match>
            <Match when={'notes' === props.name}>
              <NoteDetail data={data()} />
            </Match>
            <Match when={'labs' === props.name}>
              <LabDetail data={data()} />
            </Match>
            <Match when={'code' === props.name}>
              <CodeDetail data={data()} />
            </Match>
            <Match when={'feeds' === props.name}>
              <FeedDetail data={data()} />
            </Match>
          </Switch>
        </Match>
      </Switch>
    </main>
  )
}

export default Detail
