import { useState } from 'react'; // ✅ Add this
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from '../LoadingComp/LoadingComponent';
const Form = ({
  formData,
  handleChange,
  handleSubmit,
  error,
  hasUpperCase,
  hasLowerCase,
  hasNumber,
  hasLength,
  hasSpecialChar,
  loading,
  serverError
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  }

  const navigateLogin = useNavigate();

  const handleLogin = () => {
    navigateLogin("/Login");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-col">
        {/* Full Name */}
        <div className="pb-2">
          <label className="capitalize font-medium text-[12px] leading-[1.5] tracking-[-0.05em]">
            Fullname
          </label>
        </div>
        <div className="">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full  rounded-[10px] border-2 focus:border-[#f5f5f5] focus:border-0 py-[8px] md:pl-[30px]  md:pr-[39px] focus:bg-[#f5f5f5] bg-[#f5f5f5]"
            placeholder="Enter your full name"
          />
          <p className="text-red-700">{error.fullName}</p>
        </div>

        {/* Email */}
        <div className="py-2">
          <div className="pb-2">
            <label className="capitalize font-medium text-[12px] leading-[1.5] tracking-[-0.05em]">
              Your email address
            </label>
          </div>
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange} // ✅ fixed
              className="w-full rounded-[10px] border-2 focus:border-[#f5f5f5] focus:border-0 py-[8px] pl-[30px] pr-[39px] focus:bg-[#f5f5f5] bg-[#f5f5f5]"
              placeholder="Enter your email address"
            />
            <p className="text-red-700">{error.email}</p>

          </div>
        </div>

        {/* Organisation and Role */}
        <div className="md:flex space-x-4">
          <div className="w-full">
            <div className="pb-2">
              <label className="capitalize font-medium text-[12px] leading-[1.5] tracking-[-0.05em]">
                Organisation
              </label>
            </div>
            <input
              type="text"
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="w-full rounded-[10px] border-2 focus:border-[#f5f5f5] focus:border-0 py-[8px] pl-[30px] pr-[39px] focus:bg-[#f5f5f5] bg-[#f5f5f5]"
              placeholder="Enter your organisation"
            />
            <p className="text-red-700">{error.organisation}</p>
          </div>

          <div className="w-full ">
            <div className="pb-2">
              <label className="capitalize md:ml-0 ml-[-12px]  font-medium text-[12px] leading-[1.5] tracking-[-0.05em]">
                Role dropdown
              </label>
            </div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full md:ml-0 ml-[-12px] rounded-[10px] border-2 focus:border-[#f5f5f5] focus:border-0 py-[8px] pl-[30px] pr-[39px] focus:bg-[#f5f5f5] bg-[#f5f5f5]"
            >

              <option value="">Choose role</option>
              <option value="geophysicist">Geophysicist</option>
              <option value="geologist">Geologist</option>
              <option value="engineer">Engineer</option>
            </select>
            <p className="text-red-700">{error.role}</p>
          </div>
        </div>

        {/* Password */}
        <div className="py-2">
          <div className="pb-2">
            <label className="capitalize font-medium text-[12px] leading-[1.5] tracking-[-0.05em]">
              Your password
            </label>
          </div>
          <div className="relative">
            <div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full  rounded-[10px] border-2 focus:border-[#f5f5f5] focus:border-0 py-[8px] pl-[30px] pr-[39px] focus:bg-[#f5f5f5] bg-[#f5f5f5]"
                placeholder="Enter your password"
              />
            </div>

            <div onClick={togglePassword} className='flex justify-end absolute md:right-[8px] md:top-4 right-[10px] top-4 '>
              < FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
            </div>
          </div>
          <div className="mt-2 text-sm space-y-1">
            <p className={hasUpperCase ? "text-green-600" : "text-red-600"}>
              <FontAwesomeIcon icon={hasUpperCase ? faCheck : faTimes} /> Uppercase letter
            </p>
            <p className={hasLowerCase ? "text-green-600" : "text-red-600"}>
              <FontAwesomeIcon icon={hasLowerCase ? faCheck : faTimes} /> Lowercase letter
            </p>
            <p className={hasNumber ? "text-green-600" : "text-red-600"}>
              <FontAwesomeIcon icon={hasNumber ? faCheck : faTimes} /> Number
            </p>
            <p className={hasLength ? "text-green-600" : "text-red-600"}>
              <FontAwesomeIcon icon={hasLength ? faCheck : faTimes} /> At least 8 characters
            </p>
            <p className={hasSpecialChar ? "text-green-600" : "text-red-600"}>
              <FontAwesomeIcon icon={hasSpecialChar ? faCheck : faTimes} /> Special character
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="py-2">
          <div className="pb-2">
            <label className="capitalize font-medium text-[12px] leading-[1.5] tracking-[-0.05em]">
              Confirm password
            </label>
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-[10px] border-2 focus:border-[#f5f5f5] focus:border-0 py-[8px] pl-[30px] pr-[39px] focus:bg-[#f5f5f5] bg-[#f5f5f5]"
            placeholder="Re-enter your password"
          />
          <p className="text-red-700">{error.confirmPassword}</p>
        </div>

        {/* Submit button */}
        <div className="flex justify-center items-center w-full pt-6">
          <button
            type="submit"
            disabled={loading}
            className="capitalize cursor-pointer w-full text-center border-2 rounded-[10px] text-white bg-[#585858] focus:border-0 py-[8px] pl-[30px] pr-[39px] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? <LoadingComponent /> : "Register"}
          </button>
        </div>

        {/* Server Error Display */}
        {serverError && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {serverError}
          </div>
        )}

        {/* Links and terms */}
        <div className="w-full mt-4">
          <div className="w-full flex justify-center">
            <p>Already have an account?</p>
            <button
              type="button"
              className="ml-1 font-bold text-blue-600 underline"
              onClick={handleLogin}
            >
              Login here
            </button>
          </div>
          <div className="flex w-full items-center">
            <div>
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                className="mr-2"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
            </div>


            <div className="flex md:mx-auto texvt-cednter   items-center justify-center md:text-[12px] text-[9px]  md:w-[375px] mt-2">
              <p className='md:w-full w-8/12 text-center'>
                By continuing you agree you have read, understood and agree Terms and Conditions and Privacy Policy
              </p>
            </div>

          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;