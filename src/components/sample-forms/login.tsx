import {useEffect, useRef, useState} from "react";
import {useForm, FormProvider} from "react-hook-form";
import {InputWrapper} from "components/react-hook-form/input-wrapper";
import {Label} from "components/react-hook-form/label";
import {ErrorMessage} from "components/react-hook-form/error-message";
import {Input} from "components/react-hook-form/input";
import {LoginModel} from "../../models/auth/login-model";
import {getSession, signIn, useSession} from "next-auth/react";
import {AlertType, sonnerAlert} from "helpers/sonner-toast-service";
import Link from "next/link";
import {AuthAPIService} from "services/auth-api-service";

const Index: React.FC = () => {
  const {data: session} = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    return () => {
      setLoginError("");
      setLoading(false);
    };
  }, []);

  const methods = useForm<LoginModel>({
    defaultValues: {
      email: "noemiadmin@gmail.com",
      password: "123",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: {errors},
  } = methods;

  useEffect(() => {
    setLoginError("");
  }, [methods.watch("email"), methods.watch("password")]);

  const sessionTest = async () => {
    if (session) {
      console.log("Session: ", session);
      const serverSession = await getSession();
      console.log("Server Session: ", serverSession);
    } else {
      console.log("Session undefined!");
    }
  };

  const onSubmit = async (model: LoginModel) => {
    setLoginError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: model.email,
        password: model.password,
        callbackUrl: "/",
      });

      console.log("Login Result:", result);

      if (result?.ok) {
        console.log("Login Ok.");
      } else {
        setLoginError(result?.error || "");
      }
    } finally {
      setLoading(false);
    }
  };

  const testAuthEndpoint = async () => {
    try {
      const response = await AuthAPIService.testAuth();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-y-1 gap-x-2 sm:grid-cols-12">
            <InputWrapper outerClassName="sm:col-span-12">
              <Label id="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                rules={{required: "Correo electrónico no válido."}}
              />
              {errors?.email?.message && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper outerClassName="sm:col-span-12">
              <Label id="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                rules={{
                  required: "Ingrese una contraseña.",
                  minLength: {
                    value: 2,
                    message: "La contraseña debe tener mínimo 2 caracteres.",
                  },
                }}
              />
              {errors?.password?.message && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </InputWrapper>
          </div>
        </div>

        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              //reset();
              sessionTest();
            }}
            type="button"
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center px-3 py-2 ml-3 text-sm font-medium text-white bg-blue-500 border border-transparent shadow-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {!loading ? "Ingresar" : "Cargando..."}
          </button>
        </div>
      </form>

      <Link href="" onClick={testAuthEndpoint}>
        Test Auth
      </Link>
    </FormProvider>
  );
};

export default Index;
