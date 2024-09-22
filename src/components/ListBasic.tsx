import { For, Match, Switch } from 'solid-js'
import { A } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'

import { formatDatetime } from '~/lib/helpers/datetime'
import LinkItemList from '~/features/links/LinkItemList'

const ListBasic = (props: { data?: any; name: string }) => {
  if (!props.data || !props.data()) return null

  const name = props.name
  const items = props.data() ?? []

  return (
    <ul class={`${name} paginated basic`}>
      <Switch>
        <Match when={'links' === name}>
          <LinkItemList items={items} />
        </Match>
        <Match when={'links' !== name}>
          <For each={items}>
            {(d) => {
              const abstract = sanitizeHtml(d.abstract)
              return (
                <li>
                  <time>{formatDatetime(d.published, 'long')}</time>
                  <h3>
                    <A href={`/${name}/detail/${d.id}`}>{d.title}</A>
                  </h3>
                  <div innerHTML={abstract} />
                </li>
              )
            }}
          </For>
        </Match>
      </Switch>
    </ul>
  )
}

export default ListBasic
