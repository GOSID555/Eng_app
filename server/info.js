import os from 'node:os';

export const lanAddresses = () =>
  Object.values(os.networkInterfaces())
    .flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .map((i) => i.address);

// GET /api/info → IP ในวง LAN สำหรับเปิดหน้าควบคุมจากมือถือ
export const infoHandler = (getPort) => (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ port: getPort(), lan: lanAddresses() }));
};
