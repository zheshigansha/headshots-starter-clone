export const config = {
  packQueryType: process.env.PACK_QUERY_TYPE as 'users' | 'gallery' | 'both',
  tuneType: process.env.NEXT_PUBLIC_TUNE_TYPE as 'packs' | 'tune',
  cremEnabled: process.env.NEXT_PUBLIC_CREEM_IS_ENABLED === 'true',
  deploymentUrl: process.env.DEPLOYMENT_URL,
} as const;

function isVercelPreviewUrl(url: string): boolean {
  return url.includes('.vercel.app') &&
    (url.includes('-git-') ||
     url.match(/-[a-f0-9]{8,}\.vercel\.app/i) !== null);
}

export function validateConfig() {
  const validPackQueryTypes = ['users', 'gallery', 'both'];
  const validTuneTypes = ['packs', 'tune'];

  // 设置默认值，避免启动失败
  if (!config.packQueryType || !validPackQueryTypes.includes(config.packQueryType)) {
    console.warn(`Invalid or missing PACK_QUERY_TYPE: ${config.packQueryType}, using default 'users'`);
    (config as any).packQueryType = 'users';
  }

  if (!config.tuneType || !validTuneTypes.includes(config.tuneType)) {
    console.warn(`Invalid or missing NEXT_PUBLIC_TUNE_TYPE: ${config.tuneType}, using default 'packs'`);
    (config as any).tuneType = 'packs';
  }

  // Creem配置验证（非必需，因为可能在开发阶段）
  if (typeof config.cremEnabled !== 'boolean') {
    console.warn('NEXT_PUBLIC_CREEM_IS_ENABLED not set, payment features will be disabled');
    (config as any).cremEnabled = false;
  }

  // Add Deployment URL validation only if provided
  if (config.deploymentUrl && isVercelPreviewUrl(config.deploymentUrl)) {
    console.warn(
      'Warning: Preview URLs cannot be used for webhooks.\n' +
      'Please use either:\n' +
      '1. Your production domain (e.g., your-app.com)\n' +
      '2. For local development, use ngrok (e.g., your-tunnel.ngrok.io)'
    );
  }
}


