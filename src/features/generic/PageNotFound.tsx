import { Title } from '@solidjs/meta'

const PageNotFound = () => {
  return (
    <>
      <Title>404 (Unknown route)—Adam Ziolkowski</Title>
      <div class="page not-found">
        <h2>404</h2>
        <main>
          <p>Oops, looks like I cannot find the page you are looking for.</p>
        </main>
      </div>
    </>
  )
}

export default PageNotFound
