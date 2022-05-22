import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
  location: {lat: number; lng: number} | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const ip = req.socket.localAddress;
    const resp = await fetch(`http://ip-api.com/json/${ip}`);
    const location = await resp.json();

    res.json({location});
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({location: null, error: err.message});
    }
  }
}
