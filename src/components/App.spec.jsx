import { renderWithWrappers as render, withRedux, withRouter } from '../setupTests';
import { fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  const MAIN_TEXT = 'Visualizing your fragrances by color.';
  const props = {
    onLoad: () => {},
    onLogin: () => {},
    onLogout: () => {},
    onSubscribe: () => {},
  };

  it('renders application without the user', async () => {
    const { getByText } = render([withRedux, withRouter])(<App {...props}/>);

    await waitFor(() => {
      expect(getByText(MAIN_TEXT)).toBeInTheDocument();
    });

    fireEvent.click(getByText('My Page'));
    await waitFor(() => {
      expect(getByText('Login')).toBeInTheDocument();
    });

    fireEvent.click(getByText('Metafume'));
    expect(getByText(MAIN_TEXT)).toBeInTheDocument();
  });

  it('renders application with the user', async () => {
    const USER = {
      _id: '123',
      name: 'Ethan',
      email: 'example@mail.com',
      photoUrl: 'https://example.com',
      isSubscribed: false,
      myFavorite: [],
    };
    const propsWithUser = { ...props, user: USER };
    const { getByText } = render([withRedux, withRouter])(<App {...propsWithUser}/>);

    expect(getByText(MAIN_TEXT)).toBeInTheDocument();
    expect(getByText(`Hi, ${USER.name}`)).toBeInTheDocument();

    fireEvent.click(getByText('My Page'));
    await waitFor(() => {
      expect(getByText(USER.name)).toBeInTheDocument();
    });

    fireEvent.click(getByText('Metafume'));
    expect(getByText(MAIN_TEXT)).toBeInTheDocument();
    expect(getByText(`Hi, ${USER.name}`)).toBeInTheDocument();
  });
});
