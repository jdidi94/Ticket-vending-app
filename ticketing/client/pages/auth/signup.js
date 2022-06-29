const Signup = () => {
  return (
    <form>
      <h1>Sign up</h1>
      <div className="form-group">
        <label for="email">Email adress</label>
        <input className="form-control" />
      </div>
      <div className="form-group">
        <label for="password">password</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
};
export default Signup;
