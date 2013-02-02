<?php
// @codingStandardsIgnoreFile
// @codeCoverageIgnoreStart
// this is an autogenerated file - do not edit
spl_autoload_register(
    function($class) {
        static $classes = null;
        if ($classes === null) {
            $classes = array(
                'board0x88config' => '/php/parser/Board0x88Config.php',
                'chat' => '/php/chessDB/chat/Chat.php',
                'chatmessage' => '/php/chessDB/chat/ChatMessage.php',
                'chatmessages' => '/php/chessDB/chat/ChatMessages.php',
                'chess_json' => '/php/CHESS_JSON.php',
                'chesscountry' => '/php/db/ChessCountry.php',
                'chessdatabase' => '/php/db/ChessDatabase.php',
                'chessdatabasecollection' => '/php/db/ChessDatabaseCollection.php',
                'chessdbadapter' => '/php/db/ChessDbAdapter.php',
                'chessdbmodel' => '/php/db/ChessDbModel.php',
                'chesseco' => '/php/db/ChessEco.php',
                'chessengine' => '/php/engine/ChessEngine.php',
                'chessfen' => '/php/db/ChessFen.php',
                'chessfolder' => '/php/db/ChessFolder.php',
                'chessfoldercollection' => '/php/db/ChessFolderCollection.php',
                'chessgame' => '/php/db/ChessGame.php',
                'chessgamemetadata' => '/php/db/ChessGameMetadata.php',
                'chessinstaller' => '/installer/ChessInstaller.php',
                'chessjsoncache' => '/php/db/ChessJSONCache.php',
                'chesslicense' => '/php/ChessLicense.php',
                'chessmetadata' => '/php/db/ChessMetadata.php',
                'chessmove' => '/php/db/ChessMove.php',
                'chessplayer' => '/php/db/ChessPlayer.php',
                'chessprogressbar' => '/php/db/ChessProgressBar.php',
                'chessprogressbarcompletedstep' => '/php/db/ChessProgressBarCompletedStep.php',
                'chessprogressbartemplate' => '/php/db/ChessProgressBarTemplate.php',
                'chessprogressbartplstep' => '/php/db/ChessProgressBarTplStep.php',
                'chessregistry' => '/php/ChessRegistry.php',
                'chessseek' => '/php/db/ChessSeek.php',
                'chesssession' => '/php/db/ChessSession.php',
                'chesstree' => '/php/ChessTree.php',
                'chessuserroles' => '/php/ChessUserRoles.php',
                'database' => '/php/chessDB/Database.php',
                'dgtgameparser' => '/php/parser/DGTGameParser.php',
                'ecoimport' => '/php/EcoImport.php',
                'fen' => '/php/chessDB/Fen.php',
                'fenparser0x88' => '/php/parser/FenParser0x88.php',
                'fileupload' => '/php/db/FileUpload.php',
                'folder' => '/php/chessDB/Folder.php',
                'game' => '/php/chessDB/Game.php',
                'gameimport' => '/php/GameImport.php',
                'gameparser' => '/php/parser/GameParser.php',
                'importeco' => '/installer/ImportEco.php',
                'ludodb' => '/php/chessDB/ludoDB/LudoDB.php',
                'ludodbadapter' => '/php/chessDB/ludoDB/LudoDBInterfaces.php',
                'ludodbcache' => '/php/chessDB/ludoDB/LudoDBCache.php',
                'ludodbclassnotfoundexception' => '/php/chessDB/ludoDB/LudoDBExceptions.php',
                'ludodbcollection' => '/php/chessDB/ludoDB/LudoDBCollection.php',
                'ludodbcollectionconfigparser' => '/php/chessDB/ludoDB/LudoDBCollectionConfigParser.php',
                'ludodbconfigparser' => '/php/chessDB/ludoDB/LudoDBConfigParser.php',
                'ludodbconnectionexception' => '/php/chessDB/ludoDB/LudoDBExceptions.php',
                'ludodbiterator' => '/php/chessDB/ludoDB/LudoDBIterator.php',
                'ludodbmodel' => '/php/chessDB/ludoDB/LudoDBModel.php',
                'ludodbmysql' => '/php/chessDB/ludoDB/LudoDBMysql.php',
                'ludodbmysqli' => '/php/chessDB/ludoDB/LudoDBMySqlI.php',
                'ludodbobject' => '/php/chessDB/ludoDB/LudoDBObject.php',
                'ludodbobjectnotfoundexception' => '/php/chessDB/ludoDB/LudoDBExceptions.php',
                'ludodbpdo' => '/php/chessDB/ludoDB/LudoDBPDO.php',
                'ludodbregistry' => '/php/chessDB/ludoDB/LudoDBRegistry.php',
                'ludodbrequesthandler' => '/php/chessDB/ludoDB/LudoDBRequestHandler.php',
                'ludosql' => '/php/chessDB/ludoDB/LudoSQL.php',
                'metadata' => '/php/chessDB/Metadata.php',
                'metadatacollection' => '/php/chessDB/MetadataCollection.php',
                'metadatavalue' => '/php/chessDB/MetadataValue.php',
                'move' => '/php/chessDB/Move.php',
                'movebuilder' => '/php/parser/MoveBuilder.php',
                'moves' => '/php/chessDB/Moves.php',
                'pgngameparser' => '/php/parser/PgnGameParser.php',
                'pgnparser' => '/php/parser/PgnParser.php',
                'player' => '/php/chessDB/Player.php',
                'playerfinder' => '/php/chessDB/PlayerFinder.php',
                'remotefilereader' => '/php/RemoteFileReader.php',
                'requesthandler' => '/request-handler.php',
                'seek' => '/php/chessDB/Seek.php',
                'services_json' => '/php/jsonwrapper/JSON/JSON.php',
                'services_json_error' => '/php/jsonwrapper/JSON/JSON.php',
                'session' => '/php/chessDB/Session.php',
                'tableinstaller' => '/installer/TableInstaller.php',
                'timecontrol' => '/php/chessDB/TimeControl.php'
            );
        }
        $cn = strtolower($class);
        if (isset($classes[$cn])) {
            require __DIR__ . $classes[$cn];
        }
    }
);
// @codeCoverageIgnoreEnd