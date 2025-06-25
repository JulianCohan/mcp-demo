#!/usr/bin/env node

/**
 * Simple build script for MCP & EarningsAgent website
 * Optimizes files for production deployment
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    inputDir: './',
    outputDir: './dist',
    version: Date.now().toString(), // Simple cache busting
};

// Create output directory
if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
}

/**
 * Minify HTML by removing unnecessary whitespace and comments
 */
function minifyHTML(html) {
    return html
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .replace(/>\s+</g, '><') // Remove whitespace between tags
        .trim();
}

/**
 * Minify CSS by removing unnecessary whitespace and comments
 */
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove CSS comments
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .replace(/\s*{\s*/g, '{') // Remove whitespace around opening brace
        .replace(/;\s*/g, ';') // Remove whitespace after semicolon
        .trim();
}

/**
 * Basic JS minification (remove comments and extra whitespace)
 */
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .replace(/;\s*}/g, ';}') // Clean up semicolons
        .trim();
}

/**
 * Add cache busting to filename
 */
function addCacheBuster(filename) {
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    return `${name}.${config.version}${ext}`;
}

/**
 * Process HTML file
 */
function processHTML() {
    console.log('📄 Processing HTML...');
    
    let html = fs.readFileSync('./index.html', 'utf8');
    
    // Update asset references with cache busting
    html = html.replace('style.css', addCacheBuster('style.css'));
    html = html.replace('script.js', addCacheBuster('script.js'));
    html = html.replace('./sw.js', addCacheBuster('sw.js'));
    
    // Minify HTML
    const minified = minifyHTML(html);
    
    // Write to output
    fs.writeFileSync(path.join(config.outputDir, 'index.html'), minified);
    console.log('✅ HTML processed');
}

/**
 * Process CSS file
 */
function processCSS() {
    console.log('🎨 Processing CSS...');
    
    const css = fs.readFileSync('./style.css', 'utf8');
    const minified = minifyCSS(css);
    
    // Write to output with cache buster
    fs.writeFileSync(path.join(config.outputDir, addCacheBuster('style.css')), minified);
    console.log('✅ CSS processed');
}

/**
 * Process JavaScript file
 */
function processJS() {
    console.log('⚡ Processing JavaScript...');
    
    const js = fs.readFileSync('./script.js', 'utf8');
    const minified = minifyJS(js);
    
    // Write to output with cache buster
    fs.writeFileSync(path.join(config.outputDir, addCacheBuster('script.js')), minified);
    console.log('✅ JavaScript processed');
}

/**
 * Process Service Worker
 */
function processSW() {
    console.log('🔧 Processing Service Worker...');
    
    let sw = fs.readFileSync('./sw.js', 'utf8');
    
    // Update cache name with new version
    sw = sw.replace(/CACHE_NAME = '[^']*'/, `CACHE_NAME = 'mcp-earningsagent-v${config.version}'`);
    
    // Update asset references
    sw = sw.replace('./style.css', addCacheBuster('style.css'));
    sw = sw.replace('./script.js', addCacheBuster('script.js'));
    
    const minified = minifyJS(sw);
    
    // Write to output with cache buster
    fs.writeFileSync(path.join(config.outputDir, addCacheBuster('sw.js')), minified);
    console.log('✅ Service Worker processed');
}

/**
 * Copy static files
 */
function copyStaticFiles() {
    console.log('📁 Copying static files...');
    
    const staticFiles = [
        'offline.html',
        'robots.txt', 
        'sitemap.xml'
    ];
    
    staticFiles.forEach(file => {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            
            // Minify HTML files
            if (file.endsWith('.html')) {
                content = minifyHTML(content);
            }
            
            fs.writeFileSync(path.join(config.outputDir, file), content);
        }
    });
    
    console.log('✅ Static files copied');
}

/**
 * Generate build info
 */
function generateBuildInfo() {
    const buildInfo = {
        version: config.version,
        buildTime: new Date().toISOString(),
        files: fs.readdirSync(config.outputDir)
    };
    
    fs.writeFileSync(
        path.join(config.outputDir, 'build-info.json'), 
        JSON.stringify(buildInfo, null, 2)
    );
    
    console.log('📊 Build info generated');
}

/**
 * Main build process
 */
function build() {
    console.log('🚀 Starting build process...\n');
    
    try {
        processHTML();
        processCSS();
        processJS();
        processSW();
        copyStaticFiles();
        generateBuildInfo();
        
        console.log('\n✨ Build completed successfully!');
        console.log(`📦 Output directory: ${config.outputDir}`);
        console.log(`🔢 Cache version: ${config.version}`);
        
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run build if script is executed directly
if (require.main === module) {
    build();
}

module.exports = { build, config };