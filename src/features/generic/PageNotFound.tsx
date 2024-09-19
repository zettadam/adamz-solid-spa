import { Title } from '@solidjs/meta'

const PageNotFound = () => {
  return (
    <>
      <Title>404 (Unknown route)—Adam Ziolkowski</Title>
      <div class="not-found">
        <h3>404</h3>
        <p>Oops, looks like I cannot find the page you are looking for.</p>
      </div>
    </>
  )
}

export default PageNotFound
