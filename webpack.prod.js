
const HtmlWebPackPlugin        = require('Html-webpack-plugin');
const MiniCssExtractPlugin     = require('mini-css-extract-plugin');
const OptimizeCssAassetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin               =  require('copy-webpack-plugin');
const MinifyPlugin             = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }   = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAassetsPlugin() ]
    },
    output: {
        filename:'main.[contentHash].js'
    },
    module: {

        rules: [
            {
                 test: /\.js$/, 
                 exclude: /node_modules/, 
                 use : [
                     "babel-loader" 
                 ]
            },
             {
                 test: /\.css$/,
                 exclude: /style\.css$/,
                 use: [
                     'style-loader',
                     'css-loader'
                 ]
             },  
             {
                test: /style\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader' 
                    ]
             },
            {
                test: /\.html$/i,
                loader : 'html-loader', 
                    options: {
                        attributes: false,
                        minimize: false
                    },
                     
                    
   
            },
            {
                test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]

    },

    plugins: [

        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),

        new MiniCssExtractPlugin({

            filename: '[name][contentHash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            
            patterns:[
            { from: 'src/assets', to: 'assets/' },
            ],
           
        }),

        new MinifyPlugin(),
        new CleanWebpackPlugin(),

    ],




};


