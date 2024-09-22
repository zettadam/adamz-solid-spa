import { createResource, Match, onCleanup, Switch } from 'solid-js'
import { Title } from '@solidjs/meta'

import { client } from '~/lib/pocketbase'
import PostDetail from '~/features/posts/PostDetail'
import NoteDetail from '~/features/notes/NoteDetail'
import CodeDetail from '~/features/code/CodeDetail'
import LabDetail from '~/features/labs/LabDetail'
import EventDetail from '~/features/events/EventDetail'
import type { CollectionName } from '~/lib/api'

import Error from './Error'
import Loading from './Loading'

import { sectionTitleMap } from '~/features/generic/constants'

const Detail = (props: { identifier: string; name: CollectionName }) => {
  const [data] = createResource(async () => {
    const ac = new AbortController()
    onCleanup(() => ac.abort())

    const data = await client.collection(props.name).getOne(props.identifier)
    return data
  })

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
          {'posts' === props.name && <PostDetail data={data()} />}
          {'notes' === props.name && <NoteDetail data={data()} />}
          {'labs' === props.name && <LabDetail data={data()} />}
          {'code' === props.name && <CodeDetail data={data()} />}
          {'events' === props.name && <EventDetail data={data()} />}
        </Match>
      </Switch>
    </main>
  )
}

export default Detail
