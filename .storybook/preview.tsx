import {queryClient, ReactQueryClientProvider} from '../src/libs/react-query';
import { theme, ThemeProvider} from '../src/libs/theme';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { withRouter } from 'storybook-addon-react-router-v6';
import {MockDate} from './hooks/useMockDate';

initialize({
  onUnhandledRequest: ({ method, url }) => {
    if (url.pathname.startsWith('/my-specific-api-path')) {
      console.error(`Unhandled ${method} request to ${url}.

        This exception has been only logged in the console, however, it's strongly recommended to resolve this error as you don't want unmocked data in Storybook stories.

        If you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses
      `)
    }
  },
})

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  withRouter,
  (storyFn: any) => <MockDate mockDate="2023-01-01T00:00:00Z">{storyFn()}</MockDate>,
  (storyFn: any) =>
    <ReactQueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div style={{ margin: '0 auto'}}>{storyFn()}</div>
      </ThemeProvider>
    </ReactQueryClientProvider>
  ,
  mswDecorator
]