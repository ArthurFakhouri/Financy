import type { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { verifyJwt } from "../../services/utils/jwt";

export type GraphqlContext = {
  user?: string;
  token?: string;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export const buildContext = ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;
  let user: GraphqlContext["user"];
  let token: GraphqlContext["token"];

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length);

    try {
      const payload = verifyJwt(token);
      user = payload.id;
    } catch (err) {
      console.error(err);
    }
  }
  return Promise.resolve({ user, token, req, res });
};
