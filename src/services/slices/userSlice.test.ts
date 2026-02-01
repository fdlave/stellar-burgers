import userReducer, {
  setUser,
  clearUser,
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
} from './userSlice';
import { TUser } from '@utils-types';

jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  logoutApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn()
}));

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn()
}));

const userMock: TUser = {
  email: 'test@test.ru',
  name: 'Test User'
};

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isAuthChecked: false,
    isLoading: false,
    error: null,
    updateUserError: null
  };

  describe('reducers', () => {
    it('setUser → устанавливает user и isAuth=true', () => {
      const state = userReducer(initialState, setUser(userMock));

      expect(state.user).toEqual(userMock);
      expect(state.isAuth).toBe(true);
    });

    it('clearUser → очищает user и isAuth=false', () => {
      const state = userReducer(
        { ...initialState, user: userMock, isAuth: true },
        clearUser()
      );

      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
    });
  });

  describe('checkUserAuth', () => {
    it('pending → isLoading=true', () => {
      const state = userReducer(
        initialState,
        checkUserAuth.pending('', undefined)
      );

      expect(state.isLoading).toBe(true);
    });

    it('fulfilled с payload → user и isAuth=true', () => {
      const state = userReducer(
        initialState,
        checkUserAuth.fulfilled(userMock, '', undefined)
      );

      expect(state.user).toEqual(userMock);
      expect(state.isAuth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('fulfilled с null → просто isAuthChecked=true', () => {
      const state = userReducer(
        initialState,
        checkUserAuth.fulfilled(null, '', undefined)
      );

      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    it('rejected → error и isAuthChecked=true', () => {
      const state = userReducer(
        initialState,
        checkUserAuth.rejected(null, '', undefined, 'Ошибка')
      );

      expect(state.error).toBe('Ошибка');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('loginUser', () => {
    it('pending → isLoading=true', () => {
      const state = userReducer(
        initialState,
        loginUser.pending('', { email: '', password: '' })
      );

      expect(state.isLoading).toBe(true);
    });

    it('fulfilled → user, isAuth=true', () => {
      const state = userReducer(
        initialState,
        loginUser.fulfilled(userMock, '', { email: '', password: '' })
      );

      expect(state.user).toEqual(userMock);
      expect(state.isAuth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('rejected → error', () => {
      const state = userReducer(
        initialState,
        loginUser.rejected(null, '', { email: '', password: '' }, 'Ошибка')
      );

      expect(state.error).toBe('Ошибка');
    });
  });

  describe('registerUser', () => {
    it('fulfilled → user и isAuth=true', () => {
      const state = userReducer(
        initialState,
        registerUser.fulfilled(userMock, '', {
          email: '',
          password: '',
          name: ''
        })
      );

      expect(state.user).toEqual(userMock);
      expect(state.isAuth).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('fulfilled → обновляет user', () => {
      const state = userReducer(
        initialState,
        updateUser.fulfilled(userMock, '', { name: 'New Name' })
      );

      expect(state.user).toEqual(userMock);
    });
  });

  describe('logoutUser', () => {
    it('fulfilled → очищает user и isAuth=false', () => {
      const state = userReducer(
        { ...initialState, user: userMock, isAuth: true },
        logoutUser.fulfilled(undefined, '', undefined)
      );

      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });
});
